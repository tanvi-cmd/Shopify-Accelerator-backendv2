import StoreModule from "../modules/store";
import ProductModule from "../modules/products";
import CollectionModule from "../modules/collections";
import SearchModule from "../modules/search";
import MenusModule from "../modules/menus";
import AuthModule from "../modules/auth";
import CustomerModule from "../modules/customer";
import CartModule from "../modules/cart";
import CmsModule from "../modules/cms";
import MetaobjectsModule from "../modules/metaobjects";
import OrdersModule from "../modules/orders";
import MetafieldsModule from "../modules/metafields";
import WishlistModule from "../modules/wishlist";


export const ModuleRegistry = {
  Store: StoreModule,
  Products: ProductModule,
  Collections: CollectionModule,
  Search: SearchModule,
  Menus: MenusModule,
  Authentication: AuthModule,
  Customers: CustomerModule,
  Cart: CartModule,
  CMS: CmsModule,
  Metaobjects: MetaobjectsModule,
  Orders: OrdersModule,
  Metafields: MetafieldsModule,
  Wishlist: WishlistModule,
  Customer: CustomerModule
  
};