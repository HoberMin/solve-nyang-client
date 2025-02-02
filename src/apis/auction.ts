import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';

import { domain } from './avatar';

export type SortType = 0 | 1 | 2; // 0(최신순), 1(최고가순), 2(최저가순)
export type RarityType = 'H' | 'S' | 'A' | 'B' | 'C' | 'D';

interface AuctionParams {
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
  isMine: boolean;
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

interface SaleRequest {
  id: string;
  price: number;
}

interface UserAuctionHistory {
  id: number;
  price: number;
  name: string;
  rarity: RarityType;
  sold: boolean;
  cancelled: boolean;
  createdAt: string;
}

interface UserAuctionResponse {
  history: UserAuctionHistory[];
}
// 경매장 매물 조회
const getAuctionList = async (params: AuctionParams = {}) => {
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
      authorization: `Bearer ${localStorage.getItem('token')}`,
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

// 경매장에 판매
const auctionAvatar = async (data: SaleRequest) => {
  const response = await fetch(`${domain}/auction/sale`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
    // 에러 처리를 더 세세하게 할 수 있을 것 같은데 어떻게 해야 할 지 모르겠따 ( _ _)
  }
  return response.json();
};

export const useAuctionAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: auctionAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userAvatar'] });
    },
  });
};

// 사용자의 판매 내역 조회

const getUserAuctionList = async () => {
  const response = await fetch(`${domain}/auction/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  return data as UserAuctionResponse;
};

export const useGetUserAuctionList = () => {
  return useSuspenseQuery({
    queryKey: ['userAuctionHistory'],
    queryFn: getUserAuctionList,
  });
};

// 판매 취소하기

const cancelAuctionItem = async (auctionId: number) => {
  const response = await fetch(`${domain}/auction/sale`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      id: auctionId,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};

export const useCancelAuctionItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (auctionId: number) => cancelAuctionItem(auctionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userAuctionHistory'] });
    },
  });
};
