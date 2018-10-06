<!DOCTYPE html>
<html>
<head>
    <title>Reporting Error.</title>

    <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">

    <style>
        html, body {
            height: 100%;
        }

        body {
            margin: 0;
            padding: 0;
            width: 100%;
            color: #B0BEC5;
            display: table;
            font-weight: 100;
            font-family: 'Lato';
        }

        .container {
            text-align: center;
            display: table-cell;
            vertical-align: middle;
        }

        .content {
            text-align: center;
            display: inline-block;
        }

        .title {
            font-size: 72px;
            margin-bottom: 40px;
        }

        a{
          font-size: 14px;
          letter-spacing: -0.5px;
          text-align: left;
          color: #28a8d3;
          text-decoration:  none;
      }
  </style>
</head>
<body>
    <div class="container">
        <div class="content">
        <div class="title">You have approved tasks.</div>
            <p>Please note: All submitted tasks must be either approved or removed within 24 hours of user submission to have access to this campaign report.</p>

            <p><a href="/reports/campaign/{{ $campaign['id'] }}/submissions">Click here to view submissions</a></p>
        </div>
    </div>
</body>
</html>
