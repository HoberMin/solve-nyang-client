import { useMutation, useQueryClient } from '@tanstack/react-query';

import { axiosInstance } from './auth';

export const userExtensionAvatarToggle = async (ownedAvatarId: string) => {
  const response = await axiosInstance.patch(
    `/user/me/extension/${ownedAvatarId}`,
  );

  return response.data;
};

export const useUserExtensionAvatarToggle = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (ownedAvatarId: string) =>
      userExtensionAvatarToggle(ownedAvatarId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userAvatar'] });
    },
  });

  return mutate;
};
