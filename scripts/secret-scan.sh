#!/usr/bin/env bash
set -euo pipefail

# Scan staged files for common secret patterns before commit.
# Usage:
#   scripts/secret-scan.sh            # scans staged files
#   scripts/secret-scan.sh --all      # scans all tracked files

MODE="staged"
if [[ "${1:-}" == "--all" ]]; then
  MODE="all"
fi

if [[ "$MODE" == "staged" ]]; then
  mapfile -t FILES < <(git diff --cached --name-only --diff-filter=ACM)
else
  mapfile -t FILES < <(git ls-files)
fi

if [[ ${#FILES[@]} -eq 0 ]]; then
  echo "secret-scan: no files to scan"
  exit 0
fi

# High-signal patterns (expand over time)
PATTERNS=(
  'AIza[0-9A-Za-z_-]{35}'                    # Google API key
  'sk-[A-Za-z0-9]{20,}'                      # OpenAI-like key prefix
  'ghp_[A-Za-z0-9]{30,}'                     # GitHub PAT classic
  'github_pat_[A-Za-z0-9_]{20,}'             # GitHub fine-grained PAT
  'xox[baprs]-[A-Za-z0-9-]{10,}'             # Slack tokens
  'BEGIN[[:space:]]+[^\n]*PRIVATE[[:space:]]+KEY'  # Private keys
  '-----BEGIN[[:space:]]+.*PRIVATE KEY-----'
)

FAIL=0
for f in "${FILES[@]}"; do
  [[ -f "$f" ]] || continue
  for p in "${PATTERNS[@]}"; do
    if grep -nE "$p" "$f" >/dev/null 2>&1; then
      echo "❌ secret-scan: potential secret in $f"
      grep -nE "$p" "$f" | sed -n '1,3p'
      FAIL=1
    fi
  done
done

if [[ $FAIL -ne 0 ]]; then
  cat <<'EOF'

Commit blocked by secret-scan.
- Remove/redact the secret
- Use environment variables or local config files outside git
- If this is a false positive, adjust scripts/secret-scan.sh carefully
EOF
  exit 1
fi

echo "✅ secret-scan: no obvious secrets found"
