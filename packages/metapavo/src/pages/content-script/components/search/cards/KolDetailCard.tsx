import {
  Avatar,
  Button,
  Col,
  Grid,
  Row,
  Spacer,
  Text,
  Tooltip,
  User,
} from '@nextui-org/react';
import globalEvent from 'extension-common/src/EventBus';
import { IKOL } from 'extension-common/src/apis/kol_api';
import {
  collectObject,
  uncollectObject,
} from 'extension-common/src/apis/object_api';
import {
  AutoDecimalForToken,
  AutoKForInt,
} from 'extension-common/src/decimals';
import React from 'react';
import toast from 'react-hot-toast';

export const KolDetailCard = (props: {
  kol: IKOL;
  isCollected?: boolean;
  onPick?: (kol: IKOL) => void;
  key?: string;
}) => {
  const [following, setFollowing] = React.useState(false);
  async function collect() {
    const loading = toast.loading('collecting...');
    try {
      await collectObject(props.kol.username, 'kol');
      toast.success('success');
    } catch (e: any) {
      toast.error(e.message);
    }
    toast.dismiss(loading);
  }
  async function uncollect() {
    const loading = toast.loading('uncollecting...');
    try {
      await uncollectObject(props.kol.username);
      toast.success('success');
    } catch (e: any) {
      toast.error(e.message);
    }
    toast.dismiss(loading);
  }
  const uuid = Math.random();
  return (
    <Tooltip
      content={
        <Grid.Container
          className="user-twitter-card__container"
          css={{
            mw: '250px',
            borderRadius: '$lg',
            padding: '$sm',
          }}
        >
          <Row
            justify="space-between"
            align="center"
            css={{
              marginBottom: '10px',
            }}
          >
            <Col span={3}>
              <Avatar
                size="lg"
                src={props.kol.avatar}
                color="gradient"
                squared
              />
            </Col>
            <Col span={9}>
              <Row>
                <Grid xs={12} direction="column">
                  <Text className="user-twitter-card__text" b size={15}>
                    {props.kol.name}
                  </Text>
                  <Text
                    className="user-twitter-card__text"
                    size={14}
                    css={{ mt: '-$3' }}
                    color="#888888"
                  >
                    @{props.kol.username}
                  </Text>
                </Grid>
                {props.isCollected ? (
                  <svg
                    width="27"
                    height="27"
                    viewBox="0 0 12 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      display: 'inline-block',
                      marginTop: '7px',
                      cursor: 'pointer',
                    }}
                    onClick={async () => {
                      await uncollect();
                      props.onPick && props.onPick(props.kol);
                      globalEvent.emit('pick_kol_success');
                    }}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.39556 0.687639C7.15706 0.437454 4.84294 0.437454 2.60444 0.687639C1.35524 0.827256 0.347427 1.81147 0.200744 3.06561C-0.0669147 5.35409 -0.0669147 7.66597 0.200744 9.95445C0.347427 11.2086 1.35524 12.1928 2.60444 12.3324C4.84294 12.5826 7.15705 12.5826 9.39556 12.3324C10.6448 12.1928 11.6526 11.2086 11.7993 9.95445C12.0669 7.66597 12.0669 5.35409 11.7993 3.06561C11.6526 1.81147 10.6448 0.827256 9.39556 0.687639ZM10.1814 4.2992C10.1814 4.16679 10.1288 4.03979 10.0353 3.94611C9.94163 3.85254 9.81459 3.79999 9.68221 3.79999C9.54977 3.79999 9.4228 3.85254 9.32913 3.94611L4.85228 8.42296L3.04022 6.6109C2.9455 6.52264 2.82023 6.47459 2.69079 6.47688C2.56135 6.47916 2.43784 6.5316 2.3463 6.62314C2.25475 6.71469 2.20231 6.83819 2.20003 6.96763C2.19775 7.09708 2.2458 7.22235 2.33405 7.31707L4.4992 9.48221C4.59288 9.57575 4.71987 9.62831 4.85228 9.62831C4.98469 9.62831 5.11168 9.57575 5.20537 9.48221L10.0353 4.65228C10.1288 4.55859 10.1814 4.4316 10.1814 4.2992Z"
                      fill="#D1D0D6"
                    />
                  </svg>
                ) : (
                  <svg
                    width="27"
                    height="27"
                    viewBox="0 0 12 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      display: 'inline-block',
                      marginTop: '7px',
                      cursor: 'pointer',
                    }}
                    onClick={async () => {
                      await collect();
                      props.onPick && props.onPick(props.kol);
                      globalEvent.emit('pick_kol_success');
                    }}
                  >
                    <defs>
                      <linearGradient
                        id={'linear' + uuid}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stop-color="#7de2ac" />{' '}
                        <stop offset="50%" stop-color="#389dfa" />{' '}
                        <stop offset="100%" stop-color="#9f50ff" />{' '}
                      </linearGradient>
                    </defs>

                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.60444 0.687639C4.84294 0.437454 7.15706 0.437454 9.39556 0.687639C10.6448 0.827256 11.6526 1.81147 11.7993 3.06561C12.0669 5.35409 12.0669 7.66597 11.7993 9.95445C11.6526 11.2086 10.6448 12.1928 9.39556 12.3324C7.15705 12.5826 4.84294 12.5826 2.60444 12.3324C1.35524 12.1928 0.347427 11.2086 0.200744 9.95445C-0.0669147 7.66597 -0.0669147 5.35409 0.200744 3.06561C0.347427 1.81147 1.35524 0.827256 2.60444 0.687639ZM6.00001 2.86855C6.30212 2.86855 6.54704 3.11347 6.54704 3.41558V5.963H9.09448C9.39659 5.963 9.6415 6.20791 9.6415 6.51003C9.6415 6.81214 9.39659 7.05705 9.09448 7.05705H6.54704V9.60447C6.54704 9.90658 6.30212 10.1515 6.00001 10.1515C5.6979 10.1515 5.45298 9.90658 5.45298 9.60447V7.05705H2.90558C2.60347 7.05705 2.35856 6.81214 2.35856 6.51003C2.35856 6.20791 2.60347 5.963 2.90558 5.963H5.45299V3.41558C5.45299 3.11347 5.6979 2.86855 6.00001 2.86855Z"
                      fill={'url(#linear' + uuid + ')'}
                    />
                  </svg>
                )}
              </Row>
            </Col>
          </Row>
          <Grid.Container
            className="user-twitter-card__username-container"
            css={{
              marginBottom: '10px',
            }}
          >
            <Grid xs={12}>
              <Text
                className="user-twitter-card__text"
                size={14}
                css={{ mt: '$1' }}
                color="#888888"
              >
                {props.kol.bio}
              </Text>
            </Grid>
          </Grid.Container>

          <Grid.Container
            className="user-twitter-card__metrics-container"
            justify="flex-start"
            alignContent="center"
          >
            <Text className="user-twitter-card__text" size={14} color="#888888">
              <Text
                b
                color="foreground"
                className="user-twitter-card__text"
                size={14}
                css={{ mr: '$1' }}
              >
                {AutoKForInt(props.kol.following)}
              </Text>
              Following
            </Text>
            <Spacer inline x={0.5} />
            <Text className="user-twitter-card__text" size={14} color="#888888">
              <Text
                b
                color="foreground"
                className="user-twitter-card__text"
                size={14}
                css={{ mr: '$1' }}
              >
                {AutoKForInt(props.kol.followers)}
              </Text>
              Followers
            </Text>
          </Grid.Container>
        </Grid.Container>
      }
    >
      <User
        src={props.kol.avatar}
        name={props.kol.name}
        squared
        css={{
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <User.Link href={'https://twitter.com/' + props.kol.username}>
          @{props.kol.username}
        </User.Link>
      </User>
    </Tooltip>
  );
};
