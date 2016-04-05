export default function (response) {
  if (response.status !== 200) {
    let error = new Error(response.statusText)
    error.response = response
    throw error
  }
  return response
}
