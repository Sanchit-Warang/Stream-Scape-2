'use client'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalProps,
  ModalHeader,
  ModalFooter,
} from '@nextui-org/modal'
import { Input } from '@nextui-org/input'
import { cn } from '@/utils/tw'
import { Button } from '@nextui-org/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import useGetQuickSearch from '@/hooks/tmdb/useGetQuickSeach'
import { useState } from 'react'
import { CircularProgress } from '@nextui-org/react'
import QuickSearchListItem from './QuickSearchListItem'

type SearchModalProps = {} & Omit<
  ModalProps,
  'children' | 'size' | 'scrollBehavior'
>

const SearchModal = ({ className, ...props }: SearchModalProps) => {
  const [query, setQuery] = useState('')
  const quickSearch = useGetQuickSearch(query)

  return (
    <>
      <Modal
        {...props}
        className={cn('bg-temp min-h-[80vh] max-h-[80vh]', className)}
        size="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 pr-10">
                <Input
                  type="email"
                  placeholder="Quick Search"
                  size="sm"
                  onChange={(e) => setQuery(e.target.value)}
                  color="warning"
                  startContent={<FontAwesomeIcon icon={faSearch} />}
                />
              </ModalHeader>
              <ModalBody className="overflow-y-auto !scroll-smooth scrollbar-track-primary-200 scrollbar-thin scrollbar-thumb-primary">
                {quickSearch.data ? (
                  <div className="space-y-3">
                    {quickSearch.data.results.map((entry) => (
                      <QuickSearchListItem
                        key={entry.id}
                        entry={entry}
                        onClose={onClose}
                      />
                    ))}
                  </div>
                ) : (
                  <CircularProgress className="mt-2 mx-auto" />
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  variant="shadow"
                  size="sm"
                  onPress={onClose}
                >
                  Advance Search
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default SearchModal
