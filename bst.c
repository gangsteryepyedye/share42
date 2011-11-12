// Optimal binary search tree

#include <stdio.h>

#define MAXKEYS (30)

int n; // number of keys
int key[MAXKEYS+1];
float p[MAXKEYS+1]; // probability of hitting key i
float q[MAXKEYS+1]; // probability of missing between key[i-1] and key[i]
float c[MAXKEYS+1][MAXKEYS+1]; // cost of subtree
int r[MAXKEYS+1][MAXKEYS+1]; // root of subtree
float w[MAXKEYS+1][MAXKEYS+1]; // accumulated p and q

void opttree()
{
float x,min;
int i,j,k,h,m;
int countNoRootTrick=0,countWithRootTrick=0;

for (i=0;i<=n;i++)
  c[i][i]=0;  // width of tree h=0
for (i=0;i<n;i++) // width of tree h=1
{
  j=i+1;
  c[i][j]=w[i][j];
  r[i][j]=j;
}
for (h=2;h<=n;h++)
  for (i=0;i<=n-h;i++)
  {
    j=i+h;
    printf("Building c(%d,%d) using roots %d thru %d (%d - %d + 1)\n",
      i,j,r[i][j-1],r[i+1][j],
      r[i+1][j],r[i][j-1]);
    countWithRootTrick+=r[i+1][j]-r[i][j-1]+1;
    countNoRootTrick+=j-(i+1)+1;
    m=r[i][j-1];
    min=c[i][m-1]+c[m][j];
    printf("root %d gives %f\n",m,min);
    for (k=m+1;k<=r[i+1][j];k++)
    {
      x=c[i][k-1]+c[k][j];
      printf("root %d gives %f\n",k,x);
      if (x<min)
      {
        m=k;
        min=x;
      }
    }
    c[i][j]=min+w[i][j];
    r[i][j]=m;
  }
printf("Counts - root trick %d without root trick %d\n",
  countWithRootTrick,countNoRootTrick);
}

void prefix(int i,int j)
// prints optimal binary search tree
{
if (i<j)
{
  printf("%d",key[r[i][j]]);
  if (i<r[i][j]-1 && r[i][j]<j)
  {
    printf("(");
    prefix(i,r[i][j]-1);
    printf(",");
    prefix(r[i][j],j);
    printf(")");
  }
  else if (i<r[i][j]-1)
  {
    printf("(");
    prefix(i,r[i][j]-1);
    printf(",");
    printf(")");
  }
  else if (r[i][j]<j)
  {
    printf("(");
    printf(",");
    prefix(r[i][j],j);
    printf(")");
  }
}
}

main()
{
int i,j;

n=7;
/*
q[0]=0.06;
p[1]=0.04;
q[1]=0.06;
p[2]=0.06;
q[2]=0.06;
p[3]=0.08;
q[3]=0.06;
p[4]=0.02;
q[4]=0.05;
p[5]=0.10;
q[5]=0.05;
p[6]=0.12;
q[6]=0.05;
p[7]=0.14;
q[7]=0.05;
for (i=1;i<=n;i++)
  key[i]=i;
*/

n=5;
q[0]=0.2;
key[1]=10;
p[1]=0.09;
q[1]=0.2;
key[2]=20;
p[2]=0.1;
q[2]=0.03;
key[3]=30;
p[3]=0.2;
q[3]=0.04;
key[4]=40;
p[4]=0.02;
q[4]=0.01;
key[5]=50;
p[5]=0.05;
q[5]=0.06;


for (i=0;i<=n;i++)
{
  w[i][i]=q[i];
  printf("w[%d][%d]=%f\n",i,i,w[i][i]);
  for (j=i+1;j<=n;j++)
  {
    w[i][j]=w[i][j-1]+p[j]+q[j];
    printf("w[%d][%d]=%f\n",i,j,w[i][j]);
  }
}
opttree();
printf("Average probe length is %f\n",c[0][n]/w[0][n]);
printf("trees in parenthesized prefix\n");
for (i=0;i<=n;i++)
  for (j=0;j<=n-i;j++)
  {
    printf("c(%d,%d) cost %f ",j,j+i,c[j][j+i]);
    prefix(j,j+i);
    printf("\n");
  }
}