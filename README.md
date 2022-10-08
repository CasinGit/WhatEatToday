# TeamProject (1차 팀프로젝트)
참여자 : 최현, 김기협, 이병호

## 광주 맛집 정보 & 예약 어플 (프로젝트 가제)

### 프로젝트 깃헙 브랜치 규칙
<a href="https://velog.io/@c-on/Github-Desktop%EC%9C%BC%EB%A1%9C-%ED%98%91%EC%97%85%ED%95%98%EA%B8%B0">Github Desktop으로 협업하기</a>

### 참고 링크
- <a href="https://dhgu-dev.medium.com/%EB%A7%A8%EB%95%85%EC%97%90%EC%84%9C-%EC%8B%9C%EC%9E%91%ED%95%98%EB%8A%94-%ED%98%91%EC%97%85%EC%9D%84-%EC%9C%84%ED%95%9C-github-%EC%82%AC%EC%9A%A9%EB%B2%95-46f64418cf81">맨땅에서 시작하는 협업을 위한 Github 사용법</a>
- <a href="https://myvelop.tistory.com/114?category=917184">git으로 팀 프로젝트 관리</a>
- <a href="https://victorydntmd.tistory.com/91">🙈[Git] Github으로 협업하기 ( 토이 팀프로젝트 시나리오, 브랜치 전략 )🐵</a>
- <a href="https://firework-ham.tistory.com/12">Git Merge와 Rebase의 차이🐵</a>
- <a href="https://gwangju.openapi.redtable.global/">광주 음식점 API 도큐먼트/</a>

### 구현 기능

### Todo...
- 화면 디자인 구상 (진행중..)
- RealTime DB 구조 논의
- 기능 구현 업무 분배

![프로젝트 정보 구조도 drawio](https://user-images.githubusercontent.com/107905043/193990580-615fd70b-2c67-4708-8601-a451d96a3f1b.png)
![프로젝트 다이어그램 drawio (2)](https://user-images.githubusercontent.com/107905043/193990586-65fe9aaf-1d20-4549-9ad0-0862cd55d479.png)


#### DB 모델링
- 회원 정보 DB (accounts)
> email : 유저 이메일\
> password : 유저 비밀번호\
> ph : 연락처\
> RSTR_ID : 가게 ID (사장님만 등록)\
> bookmark : 즐겨찾기 (찜한 가게) 배열로 등록되어야함

- 리뷰 데이터 DB (reviews)
> RSTR_ID : 가게 ID\
> reviewImg : 리뷰에 등록된 이미지 URI\
> reviewerEmail : 리뷰 등록 사용자 이메일\
> score : 리뷰 별점 number (최대 5점 만점)\
> content : 리뷰 내용 (최대 400자 이하로)

- 예약 DB (reservation)
> RSTR_ID : 가게 ID\
> email : 예약자 이메일\
> reservDate : 예약 방문할 날짜\
> reservTime : 예약 방문할 시간\
> num : 예약 방문할 인원\
> message : 사장님에게 남길 메세지

#### API 정의서
- 식당명으로 검색
> 요청 REST(URI) : http://localhost:8080/api/openApi/getRstrNm?search=금성

> 요청 메세지 명세 : \
> search | 가게명 | 검색할 가게명 (한글, 영어 가능)

> 응답 메세지 명세 : \
> result | 응답 결과 | boolean\
> length | 응답 결과 갯수 | number\
> datas | 응답 데이터 | [{data1}, {data2}, ...]

- 모든 식당 기본 정보 가져오기
> 요청 REST(URI) : http://localhost:8080/api/openApi/getAllRstr

> 요청 메세지 명세 : 

> 응답 메세지 명세 : \
> result | 응답 결과 | boolean\
> length | 응답 결과 갯수 | number\
> datas | 응답 데이터 | [{data1}, {data2}, ...]



#### 식당 카테고리 목록
  '중국식',
  '한식',
  ~~'제과점영업'~~,
  ~~'분식'~~,
  '호프/통닭',
  '일식',
  ~~'다방'~~,
  '경양식',
  '기타',
  '뷔페식',
  '회집',
  '식육(숯불구이)',
  ~~'김밥(도시락)'~~,
  ~~'기타 휴게음식점'~~,
  ~~'패스트푸드'~~,
  ~~'정종/대포집/소주방'~~,
  ~~'백화점'~~,
  ~~'기타(편의점)'~~,
  '일반조리판매',
  ~~'철도역구내'~~,
  ~~'커피숍'~~,
  '탕류(보신용)',
  ~~'전통찻집'~~,
  '패밀리레스토랑',
  ~~'라이브카페'~~,
  ~~'아이스크림'~~,
  ~~'외국음식전문점(인도,태국등)'~~,
  ~~'푸드트럭'~~,
  '냉면집'
  
