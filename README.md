## Homebrew

```
$ brew --version
$ brew update
$ brew upgrade
$ brew cleanup # 不要な formulae を削除
# brew上で起動しているサービス一覧を確認する
$ brew services list
```

## PostgreSQL

```
$ brew search postgresql
```

```
$ brew install postgresql
```

```
$ psql --version
```

```
$ brew services start postgresql
```

```
$ psql -h localhost -p 5432 -U <Owner> -d postgres
```

```
postgres=# CREATE DATABASE test;
# データーベース一覧を表示する
postgres=# \l
# データーベースを切り替える
postgres=# \c test
```

## 参考

- https://zenn.dev/eguchi244_dev/articles/sql-postresql-install-20230620
