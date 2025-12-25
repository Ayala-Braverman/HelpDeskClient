import React from "react";
import Swal from "sweetalert2";
import {  type commentFromServer } from "../types/comments";
import { useCommentsQuery } from "../Query/useQuery";
import {
  Box,
  Avatar,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import { useUserContext } from "../Context/userContext";

export const ShowComments: React.FC<{ id: number }> = ({ id }) => {
  const comments = useCommentsQuery(id);
  const items = comments.data || [];
  const {user} = useUserContext();
  const currentUser = user?.userDetails;

  React.useEffect(() => {
    if (comments.error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          comments.error instanceof Error
            ? comments.error.message
            : "Failed to load comments",
      });
    }
  }, [comments.error]);

  if (comments.isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (items.length === 0) {
    return (
      <Card sx={{ border: "1px solid #e2e8f0", backgroundColor: "#f8fafc" }}>
        <CardContent sx={{ textAlign: "center", py: 3 }}>
          <Typography variant="body2" sx={{ color: "#64748b" }}>
            No comments yet
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, py: 2 }}>
      {items.map((comment: commentFromServer, index: number) => {
        const isCurrentUser = comment.author_id === currentUser?.id;
        
        return (
          <Stack
            key={comment.id ?? index}
            direction={isCurrentUser ? 'row-reverse' : 'row'}
            spacing={1}
            sx={{
              alignItems: 'flex-end',
            }}
          >
            {/* Avatar */}
            <Avatar
              sx={{
                backgroundColor: '#6366f1',
                width: 40,
                height: 40,
                fontSize: '0.875rem',
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {comment.author_name?.charAt(0).toUpperCase() || 'C'}
            </Avatar>

            {/* Comment Bubble */}
            <Box sx={{ flex: 1, maxWidth: '55%' }}>
              {/* Username and Time */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
                alignItems: 'center',
                gap: 1,
                mb: 0.5,
              }}>
                {!isCurrentUser && (
                  <>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 700, color: '#1e293b' }}
                    >
                      {comment.author_name || 'User'}
                    </Typography>
                  </>
                )}
                {isCurrentUser && (
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, color: '#1e293b' }}
                  >
                    {comment.author_name || 'משתמש'}
                  </Typography>
                )}
                <Typography
                  variant="caption"
                  sx={{ color: '#94a3b8', fontSize: '0.75rem' }}
                >
                  {comment.created_at
                    ? new Date(comment.created_at).toLocaleString('he-IL', {
                        month: '2-digit',
                        day: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : ''}
                </Typography>
              </Box>

              {/* Message Bubble */}
              <Box
                sx={{
                  backgroundColor: isCurrentUser ? '#dbeafe' : '#f0f4f8',
                  borderRadius: '16px',
                  px: 2.5,
                  py: 1.25,
                  wordWrap: 'break-word',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: '#1e293b',
                    lineHeight: 1.5,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {comment.content}
                </Typography>
              </Box>
            </Box>
          </Stack>
        );
      })}
    </Box>
  );
};