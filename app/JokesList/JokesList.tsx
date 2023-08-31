import {Card, CardBody, Pagination} from "@nextui-org/react";
import {CardFooter} from "@nextui-org/card";
import React, {useCallback, useEffect, useState} from "react";
import {useStore} from "effector-react";
import {$searchResult} from "@/app/store";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export const CreateQueryString = (searchParams: URLSearchParams, name: string, value: string) => {
        const params = new URLSearchParams(searchParams)
        params.set(name, value)

        return params.toString()
    }
const JokesList = () => {
    const searchResult = useStore($searchResult);
    const searchParams = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 11;
    const pathname = usePathname();
    const router = useRouter();
    const startIdx = (currentPage - 1) * cardsPerPage;



    useEffect(() => {
        setCurrentPage(searchParams.get('page') ? Number(searchParams.get('page')) : 1)
    }, [searchParams]);
    function formatDate(date: Date) {

        let dd: number | string = date.getDate();
        if (dd < 10) dd = '0' + dd;

        let mm: number | string = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        let yy: number | string = date.getFullYear();
        if (yy < 10) yy = '0' + yy;

        return dd + '.' + mm + '.' + yy;
    }



    const firstTwoJokes = searchResult.result.slice(startIdx, startIdx+2).map((joke) => {
        return (
            <a
                href={joke.url}
                className={'flex h-[100%] '}
                key={joke.id}>
                <Card
                    className={'w-[100%] h-[100%]'}
                    radius={'none'}
                >
                    <CardBody>
                        <div className={'m-2 font-medium'}>{joke.value}</div>

                    </CardBody>
                    <CardFooter>
                        <div className={'flex w-[100%] justify-between m-4 text-gray-400 text-sm md:flex-row flex-col'}>
                            <div>{joke.id}</div>
                            <div>{formatDate(new Date(joke.created_at))}</div>
                        </div>
                    </CardFooter>
                </Card>
            </a>
        )
    });

    const jokesList = searchResult.result.slice(startIdx + 2, currentPage * cardsPerPage).map((joke) => {
        return (
            <a
                href={joke.url}
                key={joke.id}
                className={'h-[100%] flex'}>
                <Card
                    radius={'none'}
                    className={'w-[100%] h-[100%]'}
                >
                    <CardBody>
                        <div className={'m-2 font-medium'}>{joke.value}</div>
                    </CardBody>
                    <CardFooter>
                        <div  className={'flex w-[100%] justify-between m-4 text-gray-400 text-sm md:flex-row flex-col'}>
                            <div>{joke.id}</div>
                            <div>{formatDate(new Date(joke.created_at))}</div>
                        </div>
                    </CardFooter>
                </Card>
            </a>
        );
    });

    const handlePageChange = useCallback((page: number) => {
        router.push(pathname+'?'+ CreateQueryString(searchParams,'page', page.toString()));
    }, [searchParams, pathname, router]);

    return (
        <div>
            <div className={'flex justify-center '}>
                <Pagination
                    className={'mt-4 mb-4'}
                    total={searchResult.total > cardsPerPage ? Math.ceil(searchResult.total / cardsPerPage) : 1}
                    initialPage={1}
                    page={searchParams.get('page') ? Number(searchParams.get('page')) : 1}
                    onChange={handlePageChange}
                />
            </div>
            <div className={'grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 w-[100%]'}>
                {firstTwoJokes}
            </div>
            <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}>
                {jokesList}
            </div>
            <div className={'flex justify-center '}>
                <Pagination
                    className={'mt-8'}
                    total={searchResult.total > cardsPerPage ? Math.ceil(searchResult.total / cardsPerPage) : 1}
                    initialPage={1}
                    page={searchParams.get('page') ? Number(searchParams.get('page')) : 1}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default JokesList;


