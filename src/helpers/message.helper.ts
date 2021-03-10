export class ResponseMessage {
  public status: {
    success: number,
    message?: string,
  }
  public result: any
  constructor(
    success: number,
    data?: any,
    message?: string,
  ) {
    this.status = {
      message,
      success,
    }
    this.result = data
  }
}

export class ResponseSuccess extends ResponseMessage {
  constructor(data: any, message?: string) {
    super(1, data, message)
  }
}

export class ResponseError extends ResponseMessage {
  constructor(message?: string) {
    super(0, undefined, message)
  }
}
