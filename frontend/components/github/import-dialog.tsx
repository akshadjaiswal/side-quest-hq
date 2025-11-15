'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGitHubRepos, useImportGitHubRepos } from '@/hooks/use-github-repos'
import { useState, useMemo } from 'react'
import { Search, Github, AlertCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { formatDate } from '@/lib/utils/date'

interface GitHubImportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GitHubImportDialog({ open, onOpenChange }: GitHubImportDialogProps) {
  const { data: repos = [], isLoading, error } = useGitHubRepos()
  const importRepos = useImportGitHubRepos()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRepoIds, setSelectedRepoIds] = useState<number[]>([])
  const [defaultStatus, setDefaultStatus] = useState<string>('active')
  const [makePublic, setMakePublic] = useState(true)

  const filteredRepos = useMemo(() => {
    if (!searchQuery.trim()) return repos

    const query = searchQuery.toLowerCase()
    return repos.filter(
      (repo) =>
        repo.name.toLowerCase().includes(query) ||
        (repo.description && repo.description.toLowerCase().includes(query)) ||
        (repo.language && repo.language.toLowerCase().includes(query))
    )
  }, [repos, searchQuery])

  const toggleRepo = (repoId: number) => {
    setSelectedRepoIds((prev) =>
      prev.includes(repoId) ? prev.filter((id) => id !== repoId) : [...prev, repoId]
    )
  }

  const handleImport = async () => {
    if (selectedRepoIds.length === 0) return

    await importRepos.mutateAsync({
      repo_ids: selectedRepoIds,
      default_status: defaultStatus,
      make_public: makePublic,
    })

    setSelectedRepoIds([])
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Github className="w-6 h-6" />
            Import from GitHub
          </DialogTitle>
        </DialogHeader>

        {error ? (
          <div className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <p className="text-foreground-secondary mb-4">
              {error instanceof Error ? error.message : 'Failed to load repositories'}
            </p>
            <p className="text-sm text-foreground-tertiary mb-4">
              Make sure you've granted GitHub access when signing in
            </p>
            <Button onClick={() => onOpenChange(false)}>Close</Button>
          </div>
        ) : (
          <>
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground-tertiary w-4 h-4" />
              <Input
                placeholder="Search repositories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Repository List */}
            <div className="flex-1 overflow-y-auto border border-border rounded-lg">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="text-4xl mb-2 animate-pulse">📦</div>
                    <p className="text-foreground-tertiary">Loading repositories...</p>
                  </div>
                </div>
              ) : filteredRepos.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🔍</div>
                    <p className="text-foreground-tertiary">No repositories found</p>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {filteredRepos.map((repo) => (
                    <div
                      key={repo.id}
                      className="p-4 hover:bg-background-secondary transition-colors cursor-pointer"
                      onClick={() => toggleRepo(repo.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={selectedRepoIds.includes(repo.id)}
                          onCheckedChange={() => toggleRepo(repo.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-foreground">{repo.name}</h4>
                            {repo.private && (
                              <Badge variant="outline" className="text-xs">
                                Private
                              </Badge>
                            )}
                            {repo.archived && (
                              <Badge variant="outline" className="text-xs bg-status-abandoned-light">
                                Archived
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-foreground-secondary line-clamp-2 mb-2">
                            {repo.description || 'No description'}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-foreground-tertiary">
                            {repo.language && (
                              <span className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-primary" />
                                {repo.language}
                              </span>
                            )}
                            <span>Updated {formatDate(repo.updated_at, 'MMM d, yyyy')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Import Options */}
            <div className="space-y-4 border-t border-border pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Default Status</Label>
                  <Select value={defaultStatus} onValueChange={setDefaultStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">🟢 Active</SelectItem>
                      <SelectItem value="paused">🟡 Paused</SelectItem>
                      <SelectItem value="abandoned">💀 Abandoned</SelectItem>
                      <SelectItem value="shipped">✅ Shipped</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="make-public"
                      checked={makePublic}
                      onCheckedChange={(checked) => setMakePublic(!!checked)}
                    />
                    <Label htmlFor="make-public" className="cursor-pointer">
                      Make projects public
                    </Label>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-foreground-tertiary">
                  {selectedRepoIds.length} {selectedRepoIds.length === 1 ? 'repository' : 'repositories'} selected
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => onOpenChange(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleImport}
                    disabled={selectedRepoIds.length === 0 || importRepos.isPending}
                    className="bg-primary hover:bg-primary-hover text-white"
                  >
                    {importRepos.isPending
                      ? 'Importing...'
                      : `Import ${selectedRepoIds.length} ${selectedRepoIds.length === 1 ? 'Project' : 'Projects'}`}
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
