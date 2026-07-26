'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import InputField from '@/components/InputField';
import useDebounce from '@/hooks/useDebounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string | null;
}

const SearchBarClient = ({ onSearch, initialQuery }: SearchBarProps) => {
  const [query, setQuery] = useState(initialQuery ?? '');
  const debounceQuery = useDebounce(query, 500);

  // 초기 검색어 반영
  useEffect(() => {
    setQuery(initialQuery ?? '');
  }, [initialQuery]);

  // 디바운스된 검색어로 검색
  useEffect(() => {
    const currentQuery = initialQuery?.trim() ?? '';
    const debouncedQuery = debounceQuery.trim();

    // URL에 이미 반영된 검색어라면 다시 검색하지 않음
    if (debouncedQuery === currentQuery) {
      return;
    }

    onSearch(debouncedQuery);
  }, [debounceQuery, initialQuery, onSearch]);

  return (
    <section className='bg-gray-100 px-4 py-10 md:py-20'>
      <div className='mx-auto flex max-w-3xl flex-col items-center gap-6 md:gap-10'>
        <h1 className='text-nomad-black text-center text-2xl font-bold break-keep sm:text-3xl md:w-full md:text-4xl'>
          세상의 모든 체험, Experia
        </h1>

        <form onSubmit={e => e.preventDefault()} className='w-full'>
          <div className='relative mx-auto w-full max-w-[80%] lg:max-w-[100%]'>
            <InputField
              type='text'
              name='query'
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder='내가 원하는 체험은...'
              className='focus:border-nomad-black w-full rounded-full border border-transparent bg-white px-5 py-4 pr-20 text-base shadow focus:border focus:ring-0 focus:outline-none lg:text-lg'
            />

            <button
              type='submit'
              aria-label='검색'
              className='absolute top-1/2 -right-1 -translate-y-1/2'
            >
              <Image src='/icons/ic_SearchIcon.svg' alt='검색 아이콘' width={68} height={68} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default React.memo(SearchBarClient);
