export function createEndpointUrl(city: string, apiKey: string) {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
}
