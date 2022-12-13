import { getLang } from 'extension-common/src/lang';

export default function NoLogin() {
  const loginUrl = chrome.runtime.getURL('login.html');
  return (
    <div
      style={{
        textAlign: 'left',
        width: '100%',
        fontSize: '14px',
        lineHeight: '50px',
        paddingLeft: '5px',
        color: '#666',
      }}
    >
      {getLang('not_login_for_module')}
      <a
        href={loginUrl}
        target="_blank"
        rel="noreferrer"
        style={{
          marginLeft: '10px',
        }}
      >
        {getLang('click_to_login')}
      </a>
    </div>
  );
}
