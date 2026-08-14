import { useEffect, useState } from 'react'

type WeatherState = {
  temperature: number
  humidity: number
  code: number
}

type OpenMeteoResponse = {
  current?: {
    temperature_2m?: number
    relative_humidity_2m?: number
    weather_code?: number
  }
}

const HONG_KONG_WEATHER_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=22.3193&longitude=114.1694&current=temperature_2m,relative_humidity_2m,weather_code&timezone=Asia%2FHong_Kong'

export function WeatherBadge() {
  const [weather, setWeather] = useState<WeatherState | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadWeather() {
      try {
        const response = await fetch(HONG_KONG_WEATHER_URL, {
          signal: controller.signal,
        })
        if (!response.ok) return

        const data = (await response.json()) as OpenMeteoResponse
        const current = data.current
        if (
          typeof current?.temperature_2m === 'number' &&
          typeof current.relative_humidity_2m === 'number'
        ) {
          setWeather({
            temperature: Math.round(current.temperature_2m),
            humidity: Math.round(current.relative_humidity_2m),
            code: current.weather_code ?? 0,
          })
        }
      } catch {
        if (!controller.signal.aborted) setWeather(null)
      }
    }

    void loadWeather()

    return () => controller.abort()
  }, [])

  return (
    <p className="weather-badge" aria-label="Current weather in Hong Kong">
      <WeatherIcon code={weather?.code} />
      {weather ? (
        <>
          <span>{weather.temperature}°C</span>
          <span>{weather.humidity}% RH</span>
        </>
      ) : null}
      <span>Hong Kong, China</span>
    </p>
  )
}

function WeatherIcon({ code }: { code?: number }) {
  const rainy = code != null && code >= 51
  const cloudy = code != null && code >= 1 && code < 51

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      {rainy ? (
        <>
          <path d="M10.2 19.8h12.1a5 5 0 0 0 .4-10 7.1 7.1 0 0 0-13.3 1.9 4.1 4.1 0 0 0 .8 8.1Z" />
          <path d="M11 23.5l-1.2 2.3M16 23.5l-1.2 2.3M21 23.5l-1.2 2.3" />
        </>
      ) : cloudy ? (
        <path d="M10.2 20h12.1a5.1 5.1 0 0 0 .4-10.2 7.1 7.1 0 0 0-13.3 2 4.1 4.1 0 0 0 .8 8.2Z" />
      ) : (
        <>
          <circle cx="16" cy="16" r="5.8" />
          <path d="M16 3.8v3M16 25.2v3M5.4 5.4l2.1 2.1M24.5 24.5l2.1 2.1M3.8 16h3M25.2 16h3M5.4 26.6l2.1-2.1M24.5 7.5l2.1-2.1" />
        </>
      )}
    </svg>
  )
}
