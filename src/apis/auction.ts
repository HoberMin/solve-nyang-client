import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { FullRarity } from '@/lib/type';

import { axiosInstance } from './auth';

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

  const response = await axiosInstance.get(
    searchParams.toString() ? `auction?${searchParams.toString()}` : '/auction',
  );

  return response.data as AuctionResponse;
};

export const useGetAuctionList = (params: AuctionParams = {}) => {
  return useSuspenseQuery({
    queryKey: ['auctionList', params],
    queryFn: () => getAuctionList(params),
  });
};

const auctionAvatar = async (data: SaleRequest) => {
  try {
    const response = await axiosInstance.post('/auction/sale', data);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`HTTP error! status: ${error.response?.status}`);
    }
    throw error;
  }
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

  try {
    const response = await axiosInstance.get(
      searchParams.toString()
        ? `/auction/me${searchParams.toString()}`
        : '/auction/me',
    );

    return response.data as AuctionResponse;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`HTTP error! status: ${error.response?.status}`);
    }
    throw error;
  }
};

export const useGetUserAuctionList = (params: HistoryParams) => {
  return useSuspenseQuery({
    queryKey: ['userAuctionHistory', params],
    queryFn: () => getUserAuctionList(params),
  });
};

const cancelAuctionItem = async (auctionId: number) => {
  try {
    const response = await axiosInstance.patch('/auction/sale', {
      id: auctionId,
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`HTTP error! status: ${error.response?.status}`);
    }
    throw error;
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
  try {
    const response = await axiosInstance.patch('/auction/buy', {
      id: auctionId,
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw {
        status: error.response?.status,
        message: error.response?.statusText,
      };
    }
    throw error;
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
