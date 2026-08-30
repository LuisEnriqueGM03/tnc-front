export type ActionResult<TData, TError = string> =
  { success: true; data: TData; error?: never } | { success: false; error: TError; data?: never };
