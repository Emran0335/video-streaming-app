
class ApiResponse {
  constructor(statuCode, data, message = "Success") {
    this.statusCode = statusCode,
    this.data = data,
    this.message = message,
    this.success = statuCode < 400
  }
}


export {ApiResponse}