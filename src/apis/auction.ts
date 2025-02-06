import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import { FullRarity } from '@/lib/type';

import { api } from './core';

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

interface AuctionHistoryResponse {
  history: AuctionHistoryItem[];
}

interface AuctionMessageResponse {
  message?: string;
}

const getAuctionList = async (params: AuctionParams = {}) => {
  const searchParams = new URLSearchParams();

  if (params.keyword) searchParams.append('keyword', params.keyword);
  if (params.sort !== undefined && params.sort !== 0)
    searchParams.append('sort', params.sort.toString());
  if (params.rarity) searchParams.append('rarity', params.rarity);
  if (params.page) searchParams.append('page', params.page.toString());

  const result = await api.get<AuctionResponse>(
    searchParams.toString() ? `auction?${searchParams.toString()}` : '/auction',
  );

  if (!result.isSuccess || !result.data) {
    throw new Error(result.message || '경매 목록을 불러오는데 실패했습니다.');
  }

  return result.data;
};

const auctionAvatar = async (data: SaleRequest) => {
  const result = await api.post<AuctionMessageResponse>('/auction/sale', data);

  if (!result.isSuccess) {
    throw new Error(result.message || '아바타 판매 등록에 실패했습니다.');
  }

  return result.data;
};

const getUserAuctionList = async (params: HistoryParams = {}) => {
  const searchParams = new URLSearchParams();

  if (params.filter !== undefined && params.filter !== 0) {
    searchParams.append('filter', params.filter?.toString());
  }
  if (params.page) {
    searchParams.append('page', params.page.toString());
  }

  const result = await api.get<AuctionHistoryResponse>(
    searchParams.toString()
      ? `/auction/me?${searchParams.toString()}`
      : '/auction/me',
  );

  if (!result.isSuccess || !result.data) {
    throw new Error(result.message || '경매 내역을 불러오는데 실패했습니다.');
  }

  return result.data;
};

const cancelAuctionItem = async (auctionId: number) => {
  const result = await api.patch<AuctionMessageResponse>('/auction/sale', {
    id: auctionId,
  });

  if (!result.isSuccess) {
    throw new Error(result.message || '경매 취소에 실패했습니다.');
  }

  return result.data;
};

const buyAuctionItem = async (auctionId: number) => {
  const result = await api.patch<AuctionMessageResponse>('/auction/buy', {
    id: auctionId,
  });

  if (!result.isSuccess) {
    const error = {
      status: result.status,
      message: result.message || '구매에 실패했습니다.',
    };
    throw error;
  }

  return result.data;
};

export const useGetAuctionList = (params: AuctionParams = {}) =>
  useSuspenseQuery<AuctionResponse>({
    queryKey: ['auctionList', params],
    queryFn: () => getAuctionList(params),
  });

export const useAuctionAvatar = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: auctionAvatar,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['userAvatar'] });
      toast.success(data?.message || '아바타가 성공적으로 등록되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutate;
};

export const useGetUserAuctionList = (params: HistoryParams) =>
  useSuspenseQuery<AuctionHistoryResponse>({
    queryKey: ['userAuctionHistory', params],
    queryFn: () => getUserAuctionList(params),
  });

export const useCancelAuctionItem = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: cancelAuctionItem,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['userAuctionHistory'] });
      toast.success(data?.message || '성공적으로 취소되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutate;
};

export const useBuyAuctionItem = () => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: buyAuctionItem,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['auctionList'] });
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      toast.success(data?.message || '성공적으로 구매하였습니다.');
    },
    onError: (error: { status: number; message: string }) => {
      if (error.status === 400) {
        toast.error('이미 판매된 아바타거나 판매가 취소된 아바타입니다.');
      } else if (error.status === 402) {
        toast.error('보유 냥코인이 부족합니다.');
      } else {
        toast.error(error.message);
      }
    },
  });

  return mutateAsync;
};
