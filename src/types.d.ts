import type {
  ComponentType,
  ErrorInfo,
  PropsWithChildren,
  ReactNode,
} from "react";
export interface AppState {
  user: User;
}

export type InitialState = Partial<AppState>;

export interface User {
  address: Address;
  age: number;
  bank: Bank;
  birthDate: string;
  bloodGroup: string;
  company: Company;
  crypto: Crypto;
  ein: string;
  email: string;
  eyeColor: string;
  firstName: string;
  gender: string;
  hair: Hair;
  height: number;
  id: number;
  image: string;
  ip: string;
  lastName: string;
  macAddress: string;
  maidenName: string;
  password: string;
  phone: string;
  role: string;
  ssn: string;
  university: string;
  userAgent: string;
  username: string;
  weight: number;
}

export type OptionalUser = Partial<User>;

export interface Address {
  address: string;
  city: string;
  coordinates: Coordinates;
  country: string;
  postalCode: string;
  state: string;
  stateCode: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

export interface Company {
  address: Address;
  department: string;
  name: string;
  title: string;
}

export interface Crypto {
  coin: string;
  network: string;
  wallet: string;
}

export interface Hair {
  color: string;
  type: string;
}

export type FallbackProps = {
  error: unknown;
  resetErrorBoundary: (...args: unknown[]) => void;
};

export type OnErrorCallback = (error: unknown, info: ErrorInfo) => void;

type ErrorBoundarySharedProps = PropsWithChildren<{
  /**
   * Optional callback to enable e.g. logging error information to a server.
   *
   * @param error Value that was thrown; typically an instance of `Error`
   * @param info React "component stack" identifying where the error was thrown
   */
  onError?: (error: unknown, info: ErrorInfo) => void;

  /**
   * Optional callback to to be notified when an error boundary is "reset" so React can retry the failed render.
   */
  onReset?: (
    details:
      | { reason: "imperative-api"; args: unknown[] }
      | {
          reason: "keys";
          prev: unknown[] | undefined;
          next: unknown[] | undefined;
        },
  ) => void;

  /**
   * When changed, these keys will reset a triggered error boundary.
   * This can be useful when an error condition may be tied to some specific state (that can be uniquely identified by key).
   * See the the documentation for examples of how to use this prop.
   */
  resetKeys?: unknown[];
}>;

export type ErrorBoundaryPropsWithComponent = ErrorBoundarySharedProps & {
  fallback?: never;
  /**
   * React component responsible for returning a fallback UI based on a thrown value.
   *
   * ```tsx
   * <ErrorBoundary FallbackComponent={Fallback} />
   * ```
   */
  FallbackComponent: ComponentType<FallbackProps>;
  fallbackRender?: never;
};

export type ErrorBoundaryPropsWithRender = ErrorBoundarySharedProps & {
  fallback?: never;
  FallbackComponent?: never;
  /**
   * [Render prop](https://react.dev/reference/react/Children#calling-a-render-prop-to-customize-rendering) function responsible for returning a fallback UI based on a thrown value.
   *
   * ```tsx
   * <ErrorBoundary fallbackRender={({ error, resetErrorBoundary }) => <div>...</div>} />
   * ```
   */
  fallbackRender: (props: FallbackProps) => ReactNode;
};

export type ErrorBoundaryPropsWithFallback = ErrorBoundarySharedProps & {
  /**
   * Static content to render in place of an error if one is thrown.
   *
   * ```tsx
   * <ErrorBoundary fallback={<div class="text-red">Something went wrong</div>} />
   * ```
   */
  fallback: ReactNode;
  FallbackComponent?: never;
  fallbackRender?: never;
};

export type ErrorBoundaryProps =
  | ErrorBoundaryPropsWithFallback
  | ErrorBoundaryPropsWithComponent
  | ErrorBoundaryPropsWithRender;

export interface ProductsResponse {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}

export interface Product {
  availabilityStatus: AvailabilityStatus;
  brand?: string;
  category: Category;
  description: string;
  dimensions: Dimensions;
  discountPercentage: number;
  id: number;
  images: string[];
  meta: Meta;
  minimumOrderQuantity: number;
  price: number;
  rating: number;
  returnPolicy: ReturnPolicy;
  reviews: Review[];
  shippingInformation: string;
  sku: string;
  stock: number;
  tags: string[];
  thumbnail: string;
  title: string;
  warrantyInformation: string;
  weight: number;
}

interface ProductWithQuantity extends Product {
  quantity: number;
}

export enum AvailabilityStatus {
  InStock = "In Stock",
  LowStock = "Low Stock",
}

export enum Category {
  Beauty = "beauty",
  Fragrances = "fragrances",
  Furniture = "furniture",
  Groceries = "groceries",
}

export interface Dimensions {
  depth: number;
  height: number;
  width: number;
}

export interface Meta {
  barcode: string;
  createdAt: Date;
  qrCode: string;
  updatedAt: Date;
}

export enum ReturnPolicy {
  NoReturnPolicy = "No return policy",
  The30DaysReturnPolicy = "30 days return policy",
  The60DaysReturnPolicy = "60 days return policy",
  The7DaysReturnPolicy = "7 days return policy",
  The90DaysReturnPolicy = "90 days return policy",
}

export interface Review {
  comment: string;
  date: Date;
  rating: number;
  reviewerEmail: string;
  reviewerName: string;
}
