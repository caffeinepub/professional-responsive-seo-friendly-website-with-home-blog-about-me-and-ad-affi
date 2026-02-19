import { useGetAllUsers, useListApprovals, useSetApproval } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { ApprovalStatus } from '../../backend';
import { Principal } from '@icp-sdk/core/principal';
import { toast } from 'sonner';

export function UserListTable() {
  const { data: users, isLoading: usersLoading } = useGetAllUsers();
  const { data: approvals, isLoading: approvalsLoading } = useListApprovals();
  const setApprovalMutation = useSetApproval();

  const isLoading = usersLoading || approvalsLoading;

  const handleApprove = async (userEmail: string) => {
    if (!approvals) return;

    // Find the approval info for this user by matching email
    const user = users?.find(u => u.email === userEmail);
    if (!user) {
      toast.error('User not found');
      return;
    }

    // Find the principal from approvals list
    const approvalInfo = approvals.find(a => {
      // Match by checking if any user has this principal
      return users?.some(u => u.email === userEmail);
    });

    if (!approvalInfo) {
      toast.error('Approval info not found');
      return;
    }

    try {
      await setApprovalMutation.mutateAsync({
        user: approvalInfo.principal,
        status: ApprovalStatus.approved,
      });
      toast.success('User approved successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to approve user');
    }
  };

  const getUserStatus = (userEmail: string): ApprovalStatus => {
    if (!approvals || !users) return ApprovalStatus.pending;
    
    // Find approval status by matching user data
    const userIndex = users.findIndex(u => u.email === userEmail);
    if (userIndex >= 0 && approvals[userIndex]) {
      return approvals[userIndex].status;
    }
    
    return ApprovalStatus.pending;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <Card className="glass-background border-white/10">
        <CardContent className="py-12 text-center">
          <p className="text-lg text-white/70">No users registered yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop Table View */}
      <div className="hidden md:block">
        <Card className="glass-background border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Registered Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Username</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">WhatsApp</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => {
                    const status = getUserStatus(user.email);
                    return (
                      <tr key={index} className="border-b border-white/5">
                        <td className="px-4 py-3 text-white">{user.username}</td>
                        <td className="px-4 py-3 text-white">{user.whatsappNumber}</td>
                        <td className="px-4 py-3 text-white/80 text-sm">{user.email}</td>
                        <td className="px-4 py-3">
                          {status === ApprovalStatus.approved && (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Approved
                            </Badge>
                          )}
                          {status === ApprovalStatus.pending && (
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                              <Clock className="h-3 w-3 mr-1" />
                              Pending
                            </Badge>
                          )}
                          {status === ApprovalStatus.rejected && (
                            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                              <XCircle className="h-3 w-3 mr-1" />
                              Rejected
                            </Badge>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {status === ApprovalStatus.pending && (
                            <Button
                              size="sm"
                              onClick={() => handleApprove(user.email)}
                              disabled={setApprovalMutation.isPending}
                              className="bg-green-600 text-white hover:bg-green-700"
                            >
                              {setApprovalMutation.isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                'Approve'
                              )}
                            </Button>
                          )}
                          {status === ApprovalStatus.approved && (
                            <span className="text-sm text-green-400">✓ Approved</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {users.map((user, index) => {
          const status = getUserStatus(user.email);
          return (
            <Card key={index} className="glass-background border-white/10">
              <CardContent className="p-4 space-y-3">
                <div>
                  <p className="text-sm text-white/60">Username</p>
                  <p className="text-white font-medium">{user.username}</p>
                </div>
                <div>
                  <p className="text-sm text-white/60">WhatsApp</p>
                  <p className="text-white">{user.whatsappNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-white/60">Email</p>
                  <p className="text-white/80 text-sm break-all">{user.email}</p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div>
                    {status === ApprovalStatus.approved && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Approved
                      </Badge>
                    )}
                    {status === ApprovalStatus.pending && (
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                        <Clock className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                    {status === ApprovalStatus.rejected && (
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                        <XCircle className="h-3 w-3 mr-1" />
                        Rejected
                      </Badge>
                    )}
                  </div>
                  {status === ApprovalStatus.pending && (
                    <Button
                      size="sm"
                      onClick={() => handleApprove(user.email)}
                      disabled={setApprovalMutation.isPending}
                      className="bg-green-600 text-white hover:bg-green-700"
                    >
                      {setApprovalMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        'Approve'
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
