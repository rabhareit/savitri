import React from 'react';
import { MDBContainer, MDBBtn, MDBTypography } from 'mdbreact';

export const Attention: React.FC = () => {
  return (
    <MDBContainer className="my-5">
      <MDBTypography tag="h1">はじめに</MDBTypography>
      <MDBTypography tag="p">
        この度は実験にご協力いただきありがとうございます。
        本実験では、ウェブ検索ユーザのプライバシーリスクへの意識づけを支援する提案インターフェースを検証するためのものです。
        はじめに、プライバシー意識を測るアンケートに回答していただきます。続いて検索タスクを行っていただきます。
      </MDBTypography>
      <MDBTypography tag="h2" className="mt-5">
        注意事項
      </MDBTypography>
      <MDBTypography tag="ul">
        <li className="my-3">
          実験中はブラウザの「進む・戻る」及び「再読み込み」の動作を行わないでください。実験が正しく行われない可能性があります。
        </li>
        <li className="my-3">
          本実験ではあなたのブラウザに保存された閲覧履歴データ（以下、ブラウザ履歴）にアクセスし、
          一部変更を加えた上でブラウザ内の一時的にアクセス可能な場所に保存します。本システムは
          一時的に保存された情報（以下、履歴情報）を用いてタスクを生成します。本システムはあなたのブラウザ履歴、及び履歴情報を、
          <strong className="font-weight-bold">学術研究目的以外の用途で使用致しません。</strong>
        </li>
        <li className="my-3">
          タスクの実行中、結果の分析のため、以下の情報を収集させていただきます。なお、以下の情報によっていかなる個人の特定も行われることはありません。
          <ol>
            <li>
              あなたが<strong className="font-weight-bold">実験中に</strong>閲覧したページのタイトル及び内容
            </li>
            <li>
              あなたが閲覧したページに紐付けられた<strong className="font-weight-bold">履歴情報の件数</strong>
              （履歴情報の詳細については収集いたしません）
            </li>
            <li>
              検索タスクの<strong className="font-weight-bold">所要時間</strong>
            </li>
            <li>
              検索結果画面の<strong className="font-weight-bold">閲覧時間</strong>
            </li>
          </ol>
        </li>
      </MDBTypography>
      <MDBTypography tag="p">
        上記の注意事項を確認し、実験にご協力して頂ける場合は、以下のボタンから実験用の履歴情報をアップロードしてください。
      </MDBTypography>
      <div className="mx-auto my-3">
        <MDBBtn
          color="primary"
          // onClick={}
        >
          履歴情報のアップロード
        </MDBBtn>
      </div>
    </MDBContainer>
  );
};
