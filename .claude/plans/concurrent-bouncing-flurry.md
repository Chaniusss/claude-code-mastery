# 상태줄(statusLine) 설정 계획

## Context
- 사용자가 `/statusline`으로 "모델명, 컨텍스트 사용량, 비용"을 상태줄에 표시해 달라고 요청했습니다.
- 변환할 셸 PS1이 없습니다. bash/zsh 설정 파일은 없고, PowerShell 프로필은 `Set-Location C:\` 한 줄뿐입니다.
- 그래서 요청받은 세 항목으로 새로 구성합니다.
- `C:\Users\cn970\.claude\settings.json`에는 현재 `statusLine` 항목이 없습니다.

## 실행 계획
1. `statusline-setup` 에이전트에 프롬프트 "모델명, 컨텍스트 사용량, 비용을 표시해줘"를 전달합니다.
2. 에이전트가 `C:/Users/cn970/.claude/statusline-command.sh`를 작성합니다. Git Bash로 실행되므로 경로는 슬래시를 씁니다.
   - stdin JSON에서 `model.display_name`, 컨텍스트 사용률(%), `cost.total_cost_usd`를 읽습니다.
   - 출력 형식 예: `Sonnet 5.5 | ctx 23% | $0.42`
3. 에이전트가 `settings.json`에 `statusLine` 항목(`type: command`)을 추가합니다. 기존 설정(env, permissions, model, language, tui 등)은 그대로 둡니다.

## 수정 대상
- `C:\Users\cn970\.claude\settings.json` (`statusLine` 항목 추가)
- `C:\Users\cn970\.claude\statusline-command.sh` (신규)

## 검증
- 샘플 JSON을 스크립트에 파이프로 넘겨 출력 형식을 확인합니다.
- `settings.json`이 유효한 JSON인지 확인합니다.
- 새 세션을 열어 상태줄에 모델명, 컨텍스트 %, 비용이 표시되는지 봅니다.
