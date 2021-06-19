import {StorageBase} from "./Storage";
import {ShoppingCartItem} from "../types/ShoppingCartItem";

export const ShoppingCartStorage = StorageBase<ShoppingCartItem>("cart");
