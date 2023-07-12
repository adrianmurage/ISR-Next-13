import { GoIssueOpened } from 'react-icons/go';
import getFormattedTime from '../lib/time-ago';

export default function IssuesList({ issues }) {
  return (
    <>
      <div className="border rounded-md bg-white">
        {issues.map((issue) => (
          <>
            <div className="px-3 py-4 border-b last:border-b-0 flex items-start gap-2 hover:cursor-pointer hover:bg-slate-100">
              <GoIssueOpened className="mx-2 mt-1 text-green-600 stroke-2" />
              <div className="space-y-2">
                <div className="font-bold">{issue.title}</div>
                <div className="text-sm text-gray-500">
                  #{issue.number} opened {getFormattedTime(issue.created_at)} by{' '}
                  {issue.user.login}
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
