export const loadingStatus = (data: any, error: any, size: number) => {
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');
  return [isLoadingInitialData, isLoadingMore];
};
