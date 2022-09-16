import { Box, Skeleton } from "@mui/material";

export function ItemSkeleton() {
  return (
    <div>
      <Box display={"flex"} width="100%" marginBottom={"20px"}>
        <Box width="50px" display={"flex"} justifyContent="flex-start">
          <Skeleton variant="circular" width={40} height={40} />
        </Box>
        <Box flex="1">
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="50%" />
        </Box>
        <Box width="80px" display={"flex"} justifyContent="flex-end">
          <Skeleton variant="rounded" width="70px" height="40px" />
        </Box>
      </Box>
    </div>
  );
}
