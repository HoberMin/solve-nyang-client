import { useMutation, useQueryClient } from '@tanstack/react-query';

import { domain } from './avatar';

export const userExtensionAvatarToggle = async (ownedAvatarId: string) =>
  await fetch(`${domain}/user/me/extension/${ownedAvatarId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

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
