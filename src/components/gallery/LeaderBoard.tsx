import { useEffect, useState } from 'react'
import { Spinner } from '../misc/Spinner.tsx'
import {
  GalleryEntryResponse,
  GalleryGetResponse,
  GallerySeasonResponse,
} from './types.ts'
import { getGalleryData } from './galleryApi.ts'
import { classNames } from '../../utils/helpers.ts'
import LeftChevron from '../LeftChevron.tsx'
import RightChevron from '../RightChevron.tsx'

function SeasonSection({
  seasons,
  selected,
  setSeason,
}: {
  seasons: GallerySeasonResponse[]
  selected: GallerySeasonResponse
  setSeason: (season: GallerySeasonResponse) => void
}) {
  return (
    <div className="scrollbar-hide mb-8 flex flex-row-reverse flex-wrap items-center justify-center gap-4 overflow-x-scroll">
      {seasons.map((season) => (
        <button
          key={season.season}
          onClick={() => setSeason(season)}
          className={classNames(
            'mb-2 rounded-lg px-5 py-2 text-sm font-semibold shadow transition-colors dark:shadow-none',
            selected.season === season.season
              ? 'bg-bg-container dark:bg-dark-bg-container cursor-not-allowed'
              : 'bg-bg-highlight dark:bg-dark-bg-highlight hover:bg-bg-container hover:dark:bg-dark-bg-container cursor-pointer'
          )}
        >
          <span className="text-text-highlight dark:text-dark-text-highlight">
            {season.season} сезон
          </span>
        </button>
      ))}
    </div>
  )
}

function ProjectList({
  projects,
  setProject,
}: {
  projects: GalleryEntryResponse[]
  setProject: (projectIndex: number) => void
}) {
  return (
    <div className="scrollbar-hide mb-10 flex gap-4 overflow-x-scroll sm:grid-cols-3">
      {projects.map((item, i) => {
        return (
          <div
            key={item.id}
            className="group relative w-32 shrink-0 cursor-pointer overflow-hidden rounded-t-xl md:w-64"
            onClick={() => setProject(i)}
          >
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={item.embeds[0].url}
                alt={item.displayName}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="bg-bg-container dark:bg-dark-bg-container mb-2 rounded-b-xl p-3 shadow">
              <p className="text-primary-dark dark:text-primary text-xs font-bold md:text-sm">
                {item.rank} место
              </p>
              <p className="text-text-muted text-sm font-semibold md:text-base">
                {item.displayName}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function DirectionalButton({
  direction,
  onClick,
}: {
  direction: 'left' | 'right'
  onClick: () => void
}) {
  const chevron = direction === 'left' ? <LeftChevron /> : <RightChevron />

  return (
    <button
      onClick={onClick}
      className={classNames(
        'bg-bg-highlight dark:bg-dark-bg-highlight text-text-highlight dark:text-dark-text-highlight hover:bg-bg-container hover:dark:bg-dark-bg-container absolute top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full p-2 transition-all',
        direction === 'left' ? 'left-4' : 'right-4'
      )}
    >
      {chevron}
    </button>
  )
}

export default function LeaderBoard() {
  const [data, setData] = useState<GalleryGetResponse | null>(null)
  const [loading, setLoading] = useState(true)

  const [selectedSeason, setSelectedSeason] =
    useState<GallerySeasonResponse | null>(null)
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    getGalleryData()
      .then(setData)
      .then(() => setLoading(false))
      .catch((error) => {
        console.error('Error fetching gallery data', error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (!selectedSeason) {
      setCurrentProjectIndex(0)
      setCurrentImageIndex(0)
      return
    }
  }, [selectedSeason])

  useEffect(() => {
    setCurrentImageIndex(0)
  }, [currentProjectIndex])

  useEffect(() => setSelectedSeason(data?.seasons[0] ?? null), [data])

  if (loading) {
    return <Spinner />
  }

  if (!data || !selectedSeason) {
    return (
      <div className="w-full py-20 text-center text-white">
        <p className="text-xl text-red-500">
          В данный момент невозможно получить данные аллеи, попробуйте позже.
        </p>
      </div>
    )
  }

  const entries = selectedSeason.entries
  const currentProject = entries[currentProjectIndex]
  const currentEmbed = currentProject.embeds[currentImageIndex]
  const multipleEmbeds = currentProject.embeds.length > 1

  const setPreviousImage = () =>
    setCurrentImageIndex(
      currentImageIndex > 0
        ? currentImageIndex - 1
        : currentProject.embeds.length - 1
    )

  const setNextImage = () =>
    setCurrentImageIndex(
      currentImageIndex < currentProject.embeds.length - 1
        ? currentImageIndex + 1
        : 0
    )

  return (
    <div className="bg-bg dark:bg-dark-bg w-full px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <SeasonSection
          seasons={data.seasons}
          selected={selectedSeason!!}
          setSeason={setSelectedSeason}
        />
        <ProjectList projects={entries} setProject={setCurrentProjectIndex} />
        <div className="bg-bg-container dark:bg-dark-bg-container overflow-hidden rounded-2xl">
          <div className="py-8 text-center">
            <p className="text-primary-dark dark:text-primary mb-2 text-xl font-bold tracking-wider uppercase">
              {currentProject.rank} место
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl">
              <span className="text-text-highlight dark:text-dark-text-highlight">
                {currentProject.displayName ?? currentProject.name}
              </span>
            </h2>
          </div>

          <div className="relative">
            {multipleEmbeds && (
              <DirectionalButton direction="left" onClick={setPreviousImage} />
            )}

            <img
              src={currentEmbed.url}
              alt={currentEmbed.description}
              className="h-[300px] w-full object-cover sm:h-[450px]"
            />

            {multipleEmbeds && (
              <DirectionalButton direction="right" onClick={setNextImage} />
            )}
          </div>

          {multipleEmbeds && (
            <div className="scrollbar-hide bg-bg-container dark:bg-dark-bg-container flex gap-3 overflow-x-scroll p-4">
              {currentProject.embeds.map((embed, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={classNames(
                    'relative shrink-0 overflow-hidden rounded-lg transition-all',
                    currentImageIndex === i
                      ? 'ring-primary-dark dark:ring-primary scale-105 ring-2'
                      : 'opacity-80 hover:opacity-100'
                  )}
                >
                  <img
                    src={embed.url}
                    alt={embed.description}
                    className="h-24 w-full object-cover sm:h-32"
                  />
                </button>
              ))}
            </div>
          )}

          <div className="p-6">
            <p className="text-primary-dark dark:text-primary mb-3 text-lg font-bold">
              {currentProject.displayName}
            </p>
            <p className="text-text-muted dark:text-dark-text-muted mb-4 text-sm leading-relaxed sm:text-base">
              {currentProject.description}
            </p>

            <p className="text-text-muted dark:text-dark-text-muted mb-4 text-sm leading-relaxed sm:text-base">
              <span className="text-sm">На фото:</span>{' '}
              {currentEmbed.description}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-text-muted dark:text-dark-text-muted text-sm">
                Авторы:
              </span>
              <div className="scrollbar-hide flex gap-2 overflow-x-scroll">
                {currentProject.authors.map((author) => (
                  <div
                    key={author.username}
                    className="flex items-center gap-2"
                  >
                    <img
                      src={author.url}
                      alt={author.username}
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="text-text-highlight dark:text-dark-text-highlight text-sm font-medium">
                      {author.username}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
