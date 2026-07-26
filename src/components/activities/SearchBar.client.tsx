'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import InputField from '@/components/InputField';
import useDebounce from '@/hooks/useDebounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string | null;
}

const SearchBarClient = ({ onSearch, initialQuery }: SearchBarProps) => {
  const [query, setQuery] = useState(initialQuery ?? '');
  const debounceQuery = useDebounce(query, 500);
  const isUserInput = useRef(false);

  // URL 검색어 변경 시 입력값 동기화
  useEffect(() => {
    isUserInput.current = false;
    setQuery(initialQuery ?? '');
  }, [initialQuery]);

  const handleChange = (value: string) => {
    isUserInput.current = true;
    setQuery(value);
  };

  // 사용자 입력에 debounce 검색 실행
  useEffect(() => {
    if (!isUserInput.current) return;

    onSearch(debounceQuery.trim());
    isUserInput.current = false;
  }, [debounceQuery, onSearch]);

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
              onChange={e => handleChange(e.target.value)}
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
