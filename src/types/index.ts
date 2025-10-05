export interface Campaign {
  id: string;
  name: string;
  status: 'draft' | 'pending' | 'approved' | 'running' | 'completed';
  type: 'strategy' | 'creative' | 'performance';
  createdAt: Date;
  updatedAt: Date;
  metrics?: {
    impressions: number;
    clicks: number;
    conversions: number;
    spend: number;
  };
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  permissions: string[];
}

export interface ApprovalFlow {
  id: string;
  campaignId: string;
  status: 'pending' | 'approved' | 'rejected';
  approver: string;
  comments?: string;
  timestamp: Date;
}

export interface KnowledgeNode {
  id: string;
  type: 'strategy' | 'creative' | 'performance' | 'insight';
  title: string;
  content: string;
  connections: string[];
  metadata: Record<string, any>;
}