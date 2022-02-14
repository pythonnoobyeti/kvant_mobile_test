import { ISetCurrentPage, ISetTotalPages } from "../../../interfaces"
import { SET_CURRENT_PAGE } from "../../../actions"

export const setCurrentPage = (): ISetCurrentPage => {
  return {
    type: SET_CURRENT_PAGE,
    payload: [],
  }
}
export const setTotalPages = (totalPages: number): ISetTotalPages => {
  return {
    type: SET_CURRENT_PAGE,
    payload: totalPages,
  }
}
