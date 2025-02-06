import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import { FullRarity } from '@/lib/type';

import { domain } from './avatar';

export type SortType = 0 | 1 | 2;
export type FilterType = 0 | 1 | 2 | 3;

interface AuctionParams {
  keyword?: string;
  sort?: SortType;
  rarity?: FullRarity;
  page?: number;
}

export interface Merchandise {
  id: number;
  price: number;
  name: string;
  rarity: FullRarity;
  sold: boolean;
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

interface HistoryParams {
  filter?: FilterType;
  page?: number;
}

export interface AuctionHistoryItem {
  id: number;
  price: number;
  name: string;
  rarity: FullRarity;
  sold: boolean;
  cancelled: boolean;
  createdAt: string;
}

interface AuctionResponse {
  history: AuctionHistoryItem[];
}

export interface AuctionError {
  status: number;
  message: string;
}

const getAuctionList = async (params: AuctionParams = {}) => {
  const searchParams = new URLSearchParams();

  if (params.keyword) {
    searchParams.append('keyword', params.keyword);
  }

  if (params.sort !== undefined && params.sort !== 0) {
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
  }
  return response.json();
};

export const useAuctionAvatar = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: auctionAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userAvatar'] });
    },
  });

  return mutate;
};

const getUserAuctionList = async (params: HistoryParams = {}) => {
  const searchParams = new URLSearchParams();

  if (params.filter !== undefined && params.filter !== 0) {
    searchParams.append('filter', params.filter?.toString());
  }
  if (params.page) {
    searchParams.append('page', params.page.toString());
  }

  const queryString = searchParams.toString();
  const url = queryString
    ? `${domain}/auction/me?${queryString}`
    : `${domain}/auction/me`;

  const response = await fetch(url, {
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

  return data as AuctionResponse;
};

export const useGetUserAuctionList = (params: HistoryParams) => {
  return useSuspenseQuery({
    queryKey: ['userAuctionHistory', params],
    queryFn: () => getUserAuctionList(params),
  });
};

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

  const { mutate } = useMutation({
    mutationFn: (auctionId: number) => cancelAuctionItem(auctionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userAuctionHistory'] });
      toast.success('성공적으로 취소되었습니다.');
    },
  });

  return mutate;
};

const buyAuctionItem = async (auctionId: number) => {
  const response = await fetch(`${domain}/auction/buy`, {
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
    throw { status: response.status, message: response.statusText };
  }
};

export const useBuyAuctionItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: buyAuctionItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auctionList'] });
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      toast.success('성공적으로 구매하였습니다.');
    },
    onError: (error: AuctionError) => {
      if (error?.status === 400) {
        toast.error('이미 판매된 아바타거나 판매가 취소된 아바타입니다.');
      } else if (error?.status === 402) {
        toast.error('보유 냥코인이 부족합니다.');
      }
    },
  });
};
