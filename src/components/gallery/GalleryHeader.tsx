// @ts-ignore
import cup from './assets/cup.webp'
import { classNames } from '../../utils/helpers'

const prizePool = '4 895'

function CupIcon({ className }: { className?: string }) {
    return (
        <img
            src={cup}
            className={classNames('w-16 sm:w-24', className)}
            alt="cubic cup with two handles and engraved letter 'A'"
        />
    )
}

function PrizePool() {
    return (
        <div className="font-pixelated flex flex-col items-center gap-1 select-none">
            <span className="text-text-highlight dark:text-dark-text-highlight">
                Призовой
            </span>
            <span className="text-text-highlight dark:text-dark-text-highlight">
                Фонд
            </span>
            <span className="text-primary td">{prizePool} рублей</span>
        </div>
    )
}

function Subtitle() {
    return (
        <div className="bg-bg-container/80 dark:bg-dark-bg-container/80 backdrop-blur-lg  flex flex-col items-center gap-2 rounded-xl p-4 ring-1 ring-gray-400 md:flex-row">
            <CupIcon className="hidden sm:block" />
            <PrizePool />
            <CupIcon className="hidden md:block" />
        </div>
    )
}

function GalleryTitle() {
    return (
        <div className="bg-bg-container dark:bg-dark-bg-container mt-6 flex flex-col items-center justify-around gap-3 rounded-xl p-4 ring-1 ring-gray-400 backdrop-blur-lg backdrop-brightness-50 select-none sm:flex-row">
            <span className="font-pixelated text-text-highlight dark:text-dark-text-highlight text-center text-3xl leading-snug font-bold tracking-wider sm:text-4xl xl:text-5xl">
                Аллея
            </span>
            <div className="font-title desktop:flex hidden shrink-0 flex-col text-sm font-bold uppercase">
                <span className="dark:text-text-highlight text-dark-text-highlight mr-auto rounded-lg bg-black px-1 dark:bg-white">
                    лучшие
                </span>
                <span className="dark:text-dark-text-highlight text-text-highlight ml-auto rounded-lg px-1 dark:bg-white">
                    постройки
                </span>
                <span className="dark:text-text-highlight text-dark-text-highlight rounded-lg bg-black px-1 dark:bg-white">
                    игроков за историю
                </span>
            </div>
            <span className="font-pixelated text-text-highlight dark:text-dark-text-highlight text-center text-3xl leading-snug font-bold tracking-wider sm:text-4xl xl:text-5xl">
                Эденора
            </span>
        </div>
    )
}

export default function GalleryHeader() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4">
            <GalleryTitle />
            <Subtitle />
            <div className="bg-bg-container/80 backdrop-blur-lg dark:bg-dark-bg-container/80 mt-8 rounded-xl p-4 ring-1 ring-gray-400">
                <p className="text-text-muted dark:text-dark-text-muted max-w-3xl text-center font-sans text-lg font-semibold select-none">
                    <span className="text-primary"> Аллея Эденора </span>{' '}
                    &mdash; место славы нашего сервера. Каждый сезон игроки
                    соревнуются за звание лучшего проекта, чтобы занять призовые
                    места на Аллее Эденора, и разделить призовой фонд. Учавствуй
                    вместе со своей командой!
                    {/*<span className="cursor-pointer text-blue-700">*/}
                    {/*    {' '}*/}
                    {/*    Подробнее...*/}
                    {/*</span>*/}
                </p>
            </div>
        </div>
    )
}
