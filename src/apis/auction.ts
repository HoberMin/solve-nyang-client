import { useSuspenseQuery } from '@tanstack/react-query';

import { domain } from './avatar';

type SortType = 0 | 1 | 2; // 0(최신순), 1(최고가순), 2(최저가순)
type RarityType = 'H' | 'S' | 'A' | 'B' | 'C' | 'D';

export interface AuctionParams {
  keyword?: string; // 검색어
  sort?: SortType; // 정렬
  rarity?: RarityType; // 등급
  page?: number; // 페이지
}

interface Merchandise {
  id: number;
  price: number;
  name: string;
  rarity: RarityType;
  createdAt: string;
}

interface AuctionResponse {
  currentPageNumber: number;
  size: number;
  totalPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
  merchandises: Merchandise[];
}

export const getAuctionList = async (params: AuctionParams = {}) => {
  const searchParams = new URLSearchParams();

  if (params.keyword) {
    searchParams.append('keyword', params.keyword);
  }

  if (params.sort !== undefined && params.sort !== 0) {
    // if (params.sort) {
    searchParams.append('sort', params.sort.toString());
  }

  if (params.rarity) {
    searchParams.append('rarity', params.rarity);
  }

  if (params.page) {
    searchParams.append('page', params.page.toString());
  }

  const queryString = searchParams.toString();
  const url = queryString
    ? `${domain}/auction?${queryString}`
    : `${domain}/auction`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  return data as AuctionResponse;
};

export const useGetAuctionList = (params: AuctionParams = {}) => {
  return useSuspenseQuery({
    queryKey: ['auctionList', params],
    queryFn: () => getAuctionList(params),
  });
};
