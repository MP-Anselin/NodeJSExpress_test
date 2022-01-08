const ExceptionReturn =  (code: number) => {
  switch (code.toString()) {
      case process.env.BAD_REQUEST_CODE:
          return (process.env.BAD_REQUEST_MSG)
      case process.env.UNAUTHORIZED_CODE:
          return (process.env.UNAUTHORIZED_MSG)
      case process.env.FORBIDDEN_CODE:
          return (process.env.FORBIDDEN_MSG)
      case process.env.NOT_FOUND_CODE:
          return (process.env.NOT_FOUND_MSG)
      case process.env.METHOD_NOT_ALLOWED_CODE:
          return (process.env.METHOD_NOT_ALLOWED_MSG)
      case process.env.CONFLICT_CODE:
          return (process.env.CONFLICT_MSG)
      default:
          return (process.env.INTERNAL_SERVER_ERROR_MSG)
  }
}
export default ExceptionReturn;