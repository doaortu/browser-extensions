import { useEffect, useState } from "react"
import { OPEN_SAUCED_AUTH_TOKEN_KEY } from "../constants"
import { cachedFetch } from "../utils/cache"

const removeTokenFromStorage = () => {
  return new Promise((resolve, reject) => {

    chrome.storage.sync.remove(OPEN_SAUCED_AUTH_TOKEN_KEY, () => {
      console.log("token removed")
      resolve(true)
    })
  })
}

export const useAuth = () => {
  const [authToken, setAuthToken] = useState<null | string>(null)
  const [user, setUser] = useState<null | { id: string, user_name: string }>(null)
  const [isTokenValid, setIsTokenValid] = useState<boolean|null>(null)
  
  useEffect(() => {
    chrome.storage.sync.get([OPEN_SAUCED_AUTH_TOKEN_KEY], (result) => {
      if (result[OPEN_SAUCED_AUTH_TOKEN_KEY]) {
        setAuthToken(result['os-access-token'])
        //get account data
        cachedFetch('https://api.opensauced.pizza/v1/auth/session', {
          expireInSeconds: 2 * 60 * 60, // 2 hours
          headers: {
            Authorization: `Bearer ${result['os-access-token']}`,
            Accept: 'application/json',
          },
        }).then((resp) => {
          if (!resp.ok) {
            console.log('error getting user info')
            removeTokenFromStorage().then(() => {
              setAuthToken(null)
              setUser(null)
              setIsTokenValid(false)
            })
          }
          return resp.json()
        })
          .then((json) => {
            // console.log(json)
            setUser(json)
            setIsTokenValid(true)
          })
      } else {
        console.log('No auth token found')
        setIsTokenValid(false)
      }
    });
  }, [])

  return { authToken, user, isTokenValid }
}