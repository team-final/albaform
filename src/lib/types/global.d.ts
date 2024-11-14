declare global {
  interface Window {
    kakao: any
    daum: any
  }
}
export {}

declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.json' {
  const value: any
  export default value
}

declare module '*.svg' {
  const content: string
  export default content
}

declare module 'js-cookie' {
  interface CookieAttributes {
    expires?: number | Date
    path?: string
    domain?: string
    secure?: boolean
    sameSite?: 'Strict' | 'Lax' | 'None'
  }
  function set(name: string, value: string, options?: CookieAttributes): string
  function get(name: string): string | undefined
  function remove(name: string, options?: CookieAttributes): void
  function getJSON(name: string): any
  function withAttributes(attributes: CookieAttributes): {
    set: typeof set
    get: typeof get
    remove: typeof remove
    getJSON: typeof getJSON
  }
  export { set, get, remove, getJSON, withAttributes }
}
