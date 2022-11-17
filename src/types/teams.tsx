export interface TemUsersType {
  status: string
  name: string
  email: string
  picture: string
  viewLevel: string
  key: string
}

export interface UsersType {
  boolean: { status: string | number | boolean | React.ReactFragment | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined }
  picture: {
    large: string | undefined }
  name: {
    first: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined
    last: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined }
}
