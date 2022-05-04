import { IOrder } from "../models/IOrder";

export const CREATED = 'Created';
export const PROGRESS = 'in Progress';
export const COMPLETED = 'Completed';
export const REJECTED = 'Rejected';
export const RED = '#FF0033';
export const GREEN = '#33FFCC';
export const ORANGE = '#FF9933';
export const YELLOW = '#FFFF33';
export const AUTH = '-N0lBmgHPP93wz-PFN5_'

export const TODAY_DATE = function (): string {
  const month: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let nowDate: string = new Date().toString().slice(4, 15);
  let nowDay: string = nowDate.slice(4, 6);
  let nowYear: string = nowDate.slice(7, 11);
  let nowMonth: number = month.indexOf(nowDate.slice(0, 3)) + 1;
  return nowMonth < 10 ? `${nowDay}.0${nowMonth}.${nowYear}` : `${nowDay}.${nowMonth}.${nowYear}`;
}
export const NEW_DATE = function (value: string): Date {
  const date = value.split('.');
  return new Date(+date[2], +date[1] - 1, +date[0])
}
function GET_DATE(): string {
  const month: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let nowDate: string[] = new Date().toString().slice(4, 15).split(' ');
  let nowMonth: number = month.indexOf(nowDate[0]);
  return `${nowDate[1]}.${nowMonth}.${nowDate[2]}`
}
export const CORRECT_DATE = function (value: string): string {
  const month: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let nowDate: string[] = value.slice(4, 15).split(' ');
  let nowMonth: number = month.indexOf(nowDate[0]) + 1;
  return (nowMonth < 10) ? `${nowDate[1]}.0${nowMonth}.${nowDate[2]}` : `${nowDate[1]}.${nowMonth}.${nowDate[2]}`;
}
export const ESTIMATED_DATE = function (value: number): string {
  let nowDate = GET_DATE().split('.');
  let estimatedDate = new Date(+nowDate[2], +nowDate[1], (+nowDate[0] + value)).toString();
  return CORRECT_DATE(estimatedDate);
}

export const ORDER_ACTUAL_DATE = function (orders: IOrder): IOrder {
  const order: IOrder = {
    id: orders.id,
    name: orders.name,
    description: orders.description,
    subscribersId: orders.subscribersId,
    serviceId: orders.serviceId,
    status: orders.status,
    dateOfCreation: orders.dateOfCreation,
    estimatedDate: orders.estimatedDate,
    actualDate: TODAY_DATE()
  };
  return order;
}

export const ORDER_STATUS = function (orders: IOrder, status: string): IOrder {
  const order: IOrder = {
    id: orders.id,
    name: orders.name,
    description: orders.description,
    subscribersId: orders.subscribersId,
    serviceId: orders.serviceId,
    status: status,
    dateOfCreation: orders.dateOfCreation,
    estimatedDate: orders.estimatedDate,
    actualDate: orders.actualDate
  };
  return order;
}
