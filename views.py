import json

from flask import Flask
from flask_cors import CORS
from google.cloud import bigquery

app = Flask(__name__)
CORS(app)


@app.route('/players/')
def get_players():
    return _get_bigquery_result("""
        SELECT DISTINCT id, name FROM `analysis.players` WHERE overall_rating >= 75
    """)


@app.route('/player/<player_id>')
def get_player_evolution(player_id):
    return _get_bigquery_result("""
        SELECT team_image_url, overall_rating, version_name, name FROM `analysis.players` WHERE id = {player_id}
    """, player_id=player_id)


@app.route('/versions/')
def get_versions():
    return _get_bigquery_result(
        """SELECT DISTINCT version_name FROM `sofifa.versions`"""
    )


@app.route('/teams/')
def get_teams():
    return _get_bigquery_result(
        """SELECT DISTINCT team_name FROM `analysis.players`"""
    )


@app.route('/national-teams/')
def get_national_teams():
    return _get_bigquery_result(
        """SELECT DISTINCT country AS team_name FROM `analysis.players`"""
    )


@app.route('/player-positions/')
def get_player_positions():
    return _get_bigquery_result(
        """SELECT DISTINCT player_position FROM `analysis.players`"""
    )


@app.route('/comparasion/<fifa_version>/<position>')
def get_top_players_comparasion(fifa_version, position):
    return _get_bigquery_result("""
        SELECT 
            name, team_image_url, overall_rating 
        FROM `analysis.players` 
        WHERE player_position = '{player_position}' AND version_name = '{fifa_version}' 
        ORDER BY overall_rating DESC limit 3
    """, player_position=position, fifa_version=fifa_version.replace('FIFA ', ''))


@app.route('/best/teams/<team_name>/')
def get_best_starting_team(team_name):
    return _get_bigquery_result("""
        SELECT 
            CONCAT(id, version_name) AS id,
            name,
            team_position AS player_position,
            version_name,
            image_url, 
            overall_rating,
            team_image_url 
        FROM `analysis.best_starting_team` 
        WHERE team_name = '{team_name}' 
        ORDER BY position_order
    """, team_name=team_name)


@app.route('/worst/teams/<team_name>/')
def get_worst_starting_team(team_name):
    return _get_bigquery_result("""
        SELECT
            CONCAT(id, version_name) AS id, 
            name,
            team_position AS player_position,
            version_name,
            image_url, 
            overall_rating,
            team_image_url 
        FROM `analysis.worst_starting_team` 
        WHERE team_name = '{team_name}' 
        ORDER BY position_order
    """, team_name=team_name)


@app.route('/best/national-teams/<country_name>/')
def get_national_team(country_name):
    return _get_bigquery_result("""
        SELECT 
            CONCAT(id, version_name) AS id,
            name,
            player_position,
            version_name,
            image_url, 
            overall_rating,
            country_image_url AS team_image_url 
        FROM `analysis.best_national_team` 
        WHERE country = '{country_name}' 
        ORDER BY position_order
    """, country_name=country_name)


@app.route('/potential-teams/<team_name>')
def get_potential_team(team_name):
    return _get_bigquery_result("""
        SELECT 
            player_position,
            name, 
            potential_overall_rating,
            age,
            image_url
        FROM `analysis.players` players 
        LEFT JOIN `analysis.positions` position 
        ON position.position = players.player_position 
        WHERE team_name = '{team_name}' 
        AND age <= 24 
        AND version_name = '20' 
        ORDER BY position.position_order 
    """, team_name=team_name)


@app.route('/position-evoloution/<position>')
def get_position_evolution(position):
    return _get_bigquery_result("""
        SELECT 
            * 
        FROM `analysis.best_players_by_position_and_version` 
        WHERE player_position = '{position}' 
        ORDER BY version_name 
    """, position=position)


def _get_bigquery_result(query, **kwargs):
    client = bigquery.Client()
    formated_query = query.format(**kwargs) if kwargs else query
    query_job = client.query(formated_query)
    rows = query_job.result()
    return {'result': [dict(row) for row in rows]}
