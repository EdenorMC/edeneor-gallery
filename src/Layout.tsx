// @ts-ignore
import screenDark from './assets/background-dark.png'
// @ts-ignore
import screen from './assets/background-light.webp'
import * as React from 'react'
import { createContext, useState } from 'react'
import { useTheme } from './utils/theme'
import { classNames } from './utils/helpers'

type PicBgContextType = {
  picBg: boolean
  setPicBg: (value: boolean) => void
  setGradientSettings: (value: string) => void
}
export const PicBgContext = createContext<PicBgContextType>({
    picBg: true,
    setPicBg: () => {},
    setGradientSettings: () => {},
})

export function Layout({ children }: { children: React.ReactNode }) {
    const [picBg, setPicBg] = useState(true)
    const [gradientSettings, setGradientSettings] = useState('')
    const theme = useTheme()

    const picBgContextValue: PicBgContextType = {
        picBg,
        setPicBg,
        setGradientSettings,
    }

    const backgroundImage = theme === 'dark' ? screenDark : screen

    return (
        <div className="bg-bg dark:bg-dark-bg">
            {picBg ? (
                <>
                    <div
                        className="absolute z-0 h-screen w-full rounded-b-2xl"
                        style={{
                            backgroundImage: `url("${backgroundImage}")`,
                            backgroundPosition: 'top',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                        }}
                    />
                    <div
                        className={classNames(
                            'absolute z-1 h-screen w-full',
                            gradientSettings
                        )}
                    />
                </>
            ) : null}
            <div className="flex min-h-screen select-none flex-col justify-between">
                <div className="z-2">
                    <PicBgContext.Provider value={picBgContextValue}>
                        <div className="flex grow flex-col">
                            {children}
                        </div>
                    </PicBgContext.Provider>
                </div>
            </div>
        </div>
    )
}