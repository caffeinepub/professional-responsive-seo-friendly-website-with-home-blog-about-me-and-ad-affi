import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApproveUser } from '../../hooks/useQueries';
import { CheckCircle2, Clock, XCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { UserProfile, UserStatus } from '../../backend';

interface UserListTableProps {
  users: UserProfile[];
}

export function UserListTable({ users }: UserListTableProps) {
  const approveMutation = useApproveUser();

  const handleApprove = async (username: string) => {
    try {
      await approveMutation.mutateAsync(username);
      toast.success(`User "${username}" has been approved successfully!`, {
        duration: 4000,
      });
    } catch (error: any) {
      toast.error(`Failed to approve user: ${error.message}`, {
        duration: 5000,
      });
    }
  };

  const getStatusBadge = (status: UserStatus) => {
    switch (status) {
      case 'Approved':
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Approved
          </Badge>
        );
      case 'Pending':
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        );
      case 'Rejected':
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/50">
            <XCircle className="mr-1 h-3 w-3" />
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-gray-400">
            Unknown
          </Badge>
        );
    }
  };

  const formatDate = (timestamp: bigint) => {
    try {
      const date = new Date(Number(timestamp) / 1000000); // Convert nanoseconds to milliseconds
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Invalid date';
    }
  };

  // Sort users: Pending first, then Approved, then Rejected
  const sortedUsers = [...users].sort((a, b) => {
    const statusOrder = { Pending: 0, Approved: 1, Rejected: 2 };
    const aOrder = statusOrder[a.status] ?? 3;
    const bOrder = statusOrder[b.status] ?? 3;
    return aOrder - bOrder;
  });

  return (
    <Card className="glass-background border-neon-cyan/30">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">
          Registered Users ({users.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neon-cyan/30">
                <th className="text-left py-4 px-4 text-neon-cyan font-semibold">
                  Username
                </th>
                <th className="text-left py-4 px-4 text-neon-cyan font-semibold">
                  Registered At
                </th>
                <th className="text-left py-4 px-4 text-neon-cyan font-semibold">
                  Status
                </th>
                <th className="text-right py-4 px-4 text-neon-cyan font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user, index) => (
                <tr
                  key={`${user.username}-${index}`}
                  className="border-b border-white/10 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-4 text-white font-medium">
                    {user.username}
                  </td>
                  <td className="py-4 px-4 text-gray-300">
                    {formatDate(user.registeredAt)}
                  </td>
                  <td className="py-4 px-4">{getStatusBadge(user.status)}</td>
                  <td className="py-4 px-4 text-right">
                    {user.status === 'Pending' ? (
                      <Button
                        onClick={() => handleApprove(user.username)}
                        disabled={approveMutation.isPending}
                        className="neon-button-primary min-h-10"
                        size="sm"
                      >
                        {approveMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Approving...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Approve
                          </>
                        )}
                      </Button>
                    ) : (
                      <span className="text-gray-500 text-sm">
                        {user.status === 'Approved' ? 'Already Approved' : 'Rejected'}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {sortedUsers.map((user, index) => (
            <Card
              key={`${user.username}-${index}`}
              className="bg-black/40 border-white/10"
            >
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white font-semibold text-lg">
                      {user.username}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      {formatDate(user.registeredAt)}
                    </p>
                  </div>
                  {getStatusBadge(user.status)}
                </div>

                {user.status === 'Pending' && (
                  <Button
                    onClick={() => handleApprove(user.username)}
                    disabled={approveMutation.isPending}
                    className="w-full neon-button-primary min-h-12"
                  >
                    {approveMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Approving...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="mr-2 h-5 w-5" />
                        Approve User
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
