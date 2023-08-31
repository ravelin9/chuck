'use client'
import React, {useCallback, useEffect, useState} from "react";
import {useStore} from "effector-react";

import {$searchResult, searchJokesFx} from "./store";
import {Input, Spinner} from "@nextui-org/react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import JokesList, {CreateQueryString} from "@/app/JokesList/JokesList";


const SearchComponent = () => {
    const searchParams = useSearchParams();
    const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');
    const [isLoading, setIsLoading] = useState(false);
    const searchResult = useStore($searchResult);
    const pathname = usePathname();
    const router = useRouter();



    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchValue.length >= 3) {
                setIsLoading(true);
                searchJokesFx(searchValue).then(()=> setIsLoading(false));
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [searchValue]);


    const handleChange =  useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        router.push(pathname + '?'+ CreateQueryString(searchParams,'q', e.target.value.toString()));
    }
, [pathname, router, searchParams]);




    return (
        <div className={'flex flex-col items-center justify-between p-8 md:p-16 lg:p-24 wrapper'}>
            <Input
                placeholder={'Search jokes...'}
                className={"shadow-lg w-[100%] lg:w-96"}
                type="text"
                radius={'none'}
                value={searchValue}
                onChange={handleChange}
                autoFocus
            />
            <div className={'lg:ml-16 mt-4 lg:w-96'}>found jokes: {searchValue.length < 3 ? 0 : searchResult.total}</div>
            {isLoading ?  <Spinner size="lg" /> : searchResult.total === 0 || searchValue.length < 3 ? <div className={'mt-8'}>No jokes found</div> : <>

            <JokesList/>

            </>}

        </div>
    );
};

export default SearchComponent;