import React, { FC, useCallback, useRef, useEffect } from "react";
import { PassengerCard } from "../PassengerCard/PassengerCard";
import { IListProps } from "../../interfaces";
import { useAppDispatch } from "../hooks";
import { setCurrentPage } from "../../store/reducers/pagesReducer/pagesActions";

import { useAppSelector } from "../hooks";
import { IPagesInfo } from "../../interfaces";
import { getPassengers } from "../../store/sagas/passengersSaga/passengersSagaActions";

import "./List.scss";

export const List: FC<IListProps> = ({ title, items }) => {
  const dispatcher = useAppDispatch()
  const loader = useRef<HTMLDivElement>(null);
  const pagesInfo: IPagesInfo = useAppSelector((state) => state.pagesInfo);


  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && pagesInfo.current > pagesInfo.total) {
      dispatcher(setCurrentPage())
      dispatcher(getPassengers(pagesInfo));
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "0px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, [items]);


  return (
    <div className="list">
      <div className="list__title">{title}</div>
      <div className="list__items">
        {items.map((item, index) => (
          !(items.length === index + 1) ?
          <PassengerCard passenger={item} />
          :
          <PassengerCard ref={loader} passenger={item} />
        ))}
      </div>
    </div>
  );
};
