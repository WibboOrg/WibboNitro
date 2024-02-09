import { RefObject, useMemo, useState } from 'react'
import { UseMountEffect } from './UseMountEffect'

export const useOnScreen = (ref: RefObject<HTMLElement>) =>
{
    const [ isIntersecting, setIntersecting ] = useState(false)
  
    const observer = useMemo(() => new IntersectionObserver(
        ([ entry ]) => setIntersecting(entry.isIntersecting)
    ), [ ])
  
  
    UseMountEffect(() => 
    {
        if (ref.current) 
        {
            observer.observe(ref.current)
        }
        
        return () => observer.disconnect()
    })
  
    return isIntersecting
}
