import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApproveUser } from '../../hooks/useQueries';
import { CheckCircle2, Clock, XCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { UserApprovalInfo, ApprovalStatus } from '../../backend';

interface UserListTableProps {
  approvals: UserApprovalInfo[];
}

export function UserListTable({ approvals }: UserListTableProps) {
  const approveMutation = useApproveUser();

  const handleApprove = async (principal: any, username: string) => {
    try {
      await approveMutation.mutateAsync(principal);
      toast.success(`User "${username}" has been approved successfully!`, {
        duration: 4000,
      });
    } catch (error: any) {
      console.error('Approval error:', error);
      toast.error(`Failed to approve user: ${error.message}`, {
        duration: 5000,
      });
    }
  };

  const getStatusBadge = (status: ApprovalStatus) => {
    switch (status) {
      case 'approved':
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Approved
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        );
      case 'rejected':
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

  // Sort approvals: Pending first, then Approved, then Rejected
  const sortedApprovals = [...approvals].sort((a, b) => {
    const statusOrder = { pending: 0, approved: 1, rejected: 2 };
    const aOrder = statusOrder[a.status] ?? 3;
    const bOrder = statusOrder[b.status] ?? 3;
    return aOrder - bOrder;
  });

  return (
    <Card className="glass-background border-neon-cyan/30">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">
          Registered Users ({approvals.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neon-cyan/30">
                <th className="text-left py-4 px-4 text-neon-cyan font-semibold">
                  Principal ID
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
              {sortedApprovals.map((approval, index) => {
                const principalText = approval.principal.toString();
                const shortPrincipal = `${principalText.slice(0, 8)}...${principalText.slice(-6)}`;
                
                return (
                  <tr
                    key={`${principalText}-${index}`}
                    className="border-b border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4 text-white font-mono text-sm" title={principalText}>
                      {shortPrincipal}
                    </td>
                    <td className="py-4 px-4">{getStatusBadge(approval.status)}</td>
                    <td className="py-4 px-4 text-right">
                      {approval.status === 'pending' ? (
                        <Button
                          onClick={() => handleApprove(approval.principal, shortPrincipal)}
                          disabled={approveMutation.isPending}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          {approveMutation.isPending ? (
                            <>
                              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                              Approving...
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Approve
                            </>
                          )}
                        </Button>
                      ) : (
                        <span className="text-gray-500 text-sm">No action needed</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {sortedApprovals.map((approval, index) => {
            const principalText = approval.principal.toString();
            const shortPrincipal = `${principalText.slice(0, 8)}...${principalText.slice(-6)}`;
            
            return (
              <Card
                key={`${principalText}-${index}`}
                className="bg-gray-900/60 border-white/20 rounded-xl"
              >
                <CardContent className="p-6 space-y-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Principal ID</p>
                    <p className="text-white font-mono text-sm break-all leading-relaxed" title={principalText}>
                      {principalText}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Status</p>
                    <div className="inline-block">
                      {getStatusBadge(approval.status)}
                    </div>
                  </div>

                  {approval.status === 'pending' && (
                    <Button
                      onClick={() => handleApprove(approval.principal, shortPrincipal)}
                      disabled={approveMutation.isPending}
                      className="w-full min-h-[44px] bg-green-600 hover:bg-green-700 text-white font-semibold text-base py-3 rounded-lg shadow-lg"
                    >
                      {approveMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Approving...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="mr-2 h-5 w-5" />
                          Approve
                        </>
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
