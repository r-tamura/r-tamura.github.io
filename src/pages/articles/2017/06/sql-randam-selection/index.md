---
title: SQLでのRandom Selection
date: 2017-06-09 00:34:24
path: "blog/2017/06/sql-randam-selection"
tags: [SQL, MySQL]
---
MySQLでランダムなデータを取得する場合によく利用されるのがorder by rand()だが、これはインデックスが適用されないので、代替え方法をいくつか調査したまとめ

## ランダムにソートする方法

MySQLでランダムにデータを選択する方法を調べてみると、よくあるのが`order by rand()`で
ランダムにソートして、上から欲しい件数だけ取得する方法が見つかる。SQLは以下のようなもの。

```sql
select * from customer order by rand() limit 1;
```

この場合、全レコードソートを行われるが**インデックスが使われず、テーブルスキャンでのソート**となる。  
`explain`の結果もtypeが`All`, extraが`using filesort`かつ`using temporary`となっていて、
SQLとしてはかなり非効率なものであることがわかる。

```sql
desc select * from customer order by rand() limit 1\G
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: customer
         type: ALL
possible_keys: NULL
          key: NULL
      key_len: NULL
          ref: NULL
         rows: 646
        Extra: Using temporary; Using filesort
```

### 解決法1: 最小値と最大値のランダムなキーを選択する

```sql
select
  *
from
  customer c
inner join
  -- [IDの最大値 * (0.0-1.0)のランダム値] の切り上げ
  (select ceil(rand() * (select max(customer_id) from customer)) as rand_id) rnd
on 
  c.customer_id = rnd.rand_id
```

複数行の中秋する場合はユーザ定義変数を利用する
```sql
select 
    t.*
from (
  select 
    ceil(
      rand() * (
        select 
          max(customer_id)
        from
          customer
      )
    ) random_num,
    @num:=@num + 1
  from
    (select @num:=0) as a, customer
  limit 10
) as b,
customer as t
where
    b.random_num = t.customer_id;
```

#### デメリット
 IDに欠番がある場合は使用できない

### 解決策2: 最小値と最大値のランダムなキーを選択する(欠番がある場合は欠番後の最初のキーを選択)

```sql
select
  *
from
  customer c
inner join
  -- [IDの最大値 * (0.0-1.0)のランダム値] の切り上げ
  (select ceil(rand() * (select max(customer_id) from customer)) as rand_id) rnd
on 
  -- ランダムな位置に最も近いIDを選択
  c.customer_id >= rnd.rand_id
order by c.customer_id
limit 1;
```

#### メリット
 - IDに欠番がある場合でも使用可能

#### デメリット
 - 複数選択する場合はランダムな位置から連番のものが選択される
 - 欠番の次のIDがが選択される確率が高い

### 解決策3: オフセットを用いてランダムに選択
SQLのみでなくアプリケーションも使用して、ランダムに行数を選択するSQLとその行数目を`offset`で選択する。

```sql
-- ランダムに行数を選択するSQL
select floor(rand() * (select count(*) from customer)) as id_offset;

-- 
select * from customer limit 1 offset :offset;
```

#### メリット
 - IDが数値でなくても使用できる

#### デメリット
 - 2回SQLを発行する必要がある
 - offsetが大きいと**先頭からOFFSETまでの検索も行う**ので遅くなる

## 使用するテーブルについて

この記事で使用するテーブル一覧

```sql
CREATE TABLE `customer` (
  `customer_id` smallint(5) unsigned AUTO_INCREMENT,
  PRIMARY KEY (`customer_id`),
)
```

## まとめ
今のところ、それぞれを使う場面は以下のようになる。

IDが数値 & 連番 => 解決策1  
IDが数値 & 連番でない => 解決策2  
IDが数値でない => 解決策3  

他にもワークテーブルを使用した方法もあるようなので、要調査。

## References
 - [SQL Antipattern](http://www.r-5.org/files/books/computers/languages/sql/style/Bill_Karwin-SQL_Antipatterns-EN.pdf)
 - [MySQL Select Random Records | MySQL Tutorial](http://www.mysqltutorial.org/select-random-records-database-table.aspx)
 - [ORDER BY RAND() ](http://jan.kneschke.de/projects/mysql/order-by-rand/)
 - [MySQLのlimitで大量データのパフォーマンスが遅い重い！](http://deaimobi.com/mbnk-307/)
