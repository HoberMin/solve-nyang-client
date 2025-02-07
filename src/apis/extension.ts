import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { api } from './core';

interface ExtensionToggleResponse {
  message?: string;
}

export const userExtensionAvatarToggle = async (ownedAvatarId: string) => {
  const result = await api.patch<ExtensionToggleResponse>(
    `/user/me/extension/${ownedAvatarId}`,
  );

  if (!result.isSuccess) {
    throw new Error(result.message || '확장 아바타 설정 변경에 실패했습니다.');
  }
};

export const useUserExtensionAvatarToggle = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: userExtensionAvatarToggle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userAvatar'] });
      toast.success('익스텐션 아바타가 변경되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutate;
};
