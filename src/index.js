(async () => {
  let elements = document.getElementsByClassName('g');
  let targets = Array.prototype.filter.call(elements, (elm) => {
    return elm.className === 'g'
  });

  db = getConnection();

  Array.from(targets).map( (t, idx) => {
    let baseURL = t.children[t.children.length-1].children[0].children[0].href;
    let contents = getCookieList(db, getDomain(baseURL));
    const panel = createPanel(idx, contents);
    t.addEventListener('mouseover', (eve) => {
      t.parentNode.insertBefore(panel, t);
      // eve.target.style.background='#161821';
      // setTimeout(() => {eve.target.style.background=''}, 500);
    });
    t.addEventListener('mouseleave', (eve) => {
      setTimeout( () => {
        let pnl = document.getElementById(`annotate${idx}`);
        pnl.remove();
      }, 500);
    });
  });

  chrome.runtime.sendMessage({method: 'history', max: 1000}, res => {
    if (res.status) {
      console.log(res.data);
    } else {
      console.log('Invalid method.');
    }
  });
})();

function createPanel(suffix, contents) {
  let text = contents ? contents.map( r => r.domain ).join(',') : 'No cookies';
  let panel = document.createElement('div');
  panel.id = `annotate${suffix}`;
  panel.style.backgroundColor = '#161821';
  panel.style.width = '360px';
  panel.style.height = '240px';
  panel.style.position = 'absolute';
  panel.style.left = '640px';
  let testp = document.createElement('p');
  testp.innerText = text;
  testp.style.color = 'red';
  panel.appendChild(testp);
  return panel;
}

function getDomain(url) {
  let re = /(https?:\/\/[^\/]+)\//;
  let matched = url.match(re);
  return matched[1];
}

function collectURL() {
  // May be make this block as a function
  let elements = document.getElementsByClassName('g');
  let targets = Array.prototype.filter.call(elements, (elm) => {
    return elm.className === 'g'
  });

  const linkEntries = Array.from(targets).map( (t, idx) => {
    let k = 'savitri' + Date.now().toString() + idx;
    let v = t.children[t.children.length-1].children[0].children[0].href
    console.log(`collected: ${v}`);
    localStorage.setItem(k, v);
    return [`link${idx}`, v];
  });
  return Object.fromEntries(linkEntries);
}

/**
 * Database functions
 * 
 * tx.executeSql -> Error Code
 *  UNKNOWN_ERR: 0
 *  DATABASE_ERR: 1
 *  VERSION_ERR: 2
 *  TOO_LARGE_ERR: 3
 *  QUOTA_ERR: 4
 *  SYNTAX_ERR: 5
 *  CONSTRAINT_ERR: 6
 *  TIMEOUT_ERR: 7
 */

const GET_COOKIE_LIST_QUERY = '\
  SELECT\
    domain,\
    httponly,\
    secure\
  FROM\
    cookie,\
    page_cookie_junction,\
    page\
  WHERE\
    page.id = page_cookie_junction.page_id\
  AND\
    page_cookie_junction.cookie_id = cookie.id\
  AND\
    page.start_uri = ?\
'

const GET_REQUESTED_URIS_QUERY ='\
  SELECT\
    requested_uris\
  FROM\
    page\
  WHERE\
    page.final_uri_no_args = ?\
'

// name, version, description, size
function getConnection() {
  return openDatabase(
    'savitri',
    '1.0',
    'DB for savitri',
    1024 * 1024
  );
}

function ping(db) {
  if (!db) {
    db = getConnection();
  }
  return db
}

function getCookieList(db, target) {
  return db.transaction( tx =>{
    return tx.executeSql(GET_COOKIE_LIST_QUERY, [target],
      (_, {rows}) => {
        if (rows.length > 0) {
          console.log('Found', target, rows)
          return rows;
        } else {
          console.log('Error', target, 'Empty result set.');
          return;
        }
      },
      (_, err) => {console.log(err)}
    );
  });
}

function getRequestedUris(db, uri) {
  db.transaction( tx =>{
    tx.executeSql(GET_REQUESTED_URIS_QUERY, [uri],
      (tx, result) => {},
      (_, err) => {}
    );
  });
}

function encode4SQLQuery(query) {
  return query.replace(/;[^\n]/g, '\;').replace(/[^,(\s]'[^,)\s]/g, '__quote__').replace(/\n/g, '');
}

function decode4SQLQuery(query) {
  return query.replace(/__semicolon__/g, ';').replace(/__quote__/g, '\'');
}

function saveHistory4Xray(histories) {
  histories.array.forEach( history => {
    chrome.runtime.sendMessage({method: 'set', key: `savitri${history.lastVisitTime}`, value: history.url});
  });
}